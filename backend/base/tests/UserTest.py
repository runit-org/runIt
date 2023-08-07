from django.test import TestCase
from base.tests import BaseTestClass
from django.test import Client
from base.models import User, UserExtend, UserVote, EventMember, Event
from base.factories import UserFactory
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventMemberStatus, Utils
import random
import string
from django.utils import timezone
import datetime
from dateutil import parser
from django.contrib.auth.hashers import check_password

class UserTestClass(BaseTestClass):
    newUser = None
    baseUrl = '/api/user/'

    def setUp(self):
        self.newUser = UserFactory.build().__dict__

    def test_get_user_profile_success(self):
        url = self.baseUrl + 'profile/' + self.newUser['username'] + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.newUser['username'], response.json()['data']['username'])
        self.assertTrue('statusMessage' in response.json()['data'])
        self.assertTrue('last_login' in response.json()['data'])
        self.assertTrue('numParticipatedEvents' in response.json()['data'])

    def test_get_user_last_login_time_on_user_profile_success(self):
        url = self.baseUrl + 'profile/' + self.newUser['username'] + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        user.last_login = timezone.make_aware(datetime.datetime.now())
        user.save()

        response = c.get(url, {}, format='json')
        self.assertEqual(user.last_login, parser.parse(response.json()['data']['last_login']))

    def test_get_number_of_participated_events_on_user_profile_success(self):
        url = self.baseUrl + 'profile/' + self.newUser['username'] + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            event = self.generateNewEventObject(),
            status = EventMemberStatus.get.ACCEPTED.value,
        )
        Event.objects.create(
            user = user
        )

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2, response.json()['data']['numParticipatedEvents'])

    def test_get_user_profile_username_not_found_fails(self):
        url = self.baseUrl + 'profile/' + ('a'*20) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        
    def test_get_my_profile_success(self):
        url = self.baseUrl + 'me/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.newUser['username'], response.json()['data']['username'])

    def test_create_new_vote_on_user_success(self):
        targetVoteUser = User.objects.create(
            username = 'voteduser',
            email    = 'voteduser@email.com',
            password = self.newUser['password']
        )
        url = self.baseUrl + 'vote/' + str(targetVoteUser.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            'status': UserVoteStatus.get.UPVOTE.value
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual('Vote created', response.json()['message'])
        self.assertEqual(1, self.getUserTotalVotes(targetVoteUser.id))

    def test_remove_vote_on_user_success(self):
        targetVoteUser = User.objects.create(
            username = 'voteduser',
            email    = 'voteduser@email.com',
            password = self.newUser['password']
        )
        url = self.baseUrl + 'vote/' + str(targetVoteUser.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            'status': UserVoteStatus.get.UPVOTE.value
        }
        response = c.post(url, data, format='json')

        # Send the same vote again to remove the initial vote
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual('Vote removed', response.json()['message'])
        self.assertEqual(0, self.getUserTotalVotes(targetVoteUser.id))

    # REMOVED DOWNVOTE
    # def test_update_vote_on_user_success(self):
    #     targetVoteUser = User.objects.create(
    #         username = 'voteduser',
    #         email    = 'voteduser@email.com',
    #         password = self.newUser['password']
    #     )
    #     url = self.baseUrl + 'vote/' + str(targetVoteUser.id) + '/'

    #     # Authenticate user-------------------------------------------
    #     self.createNewUser()
    #     user = User.objects.get(username=self.newUser['username'])
    #     c = APIClient()
    #     c.force_authenticate(user=user)
    #     # ------------------------------------------------------------

    #     data = {
    #         'status': UserVoteStatus.get.UPVOTE.value
    #     }
    #     response = c.post(url, data, format='json')

    #     # Send a different vote to update the vote
    #     data = {
    #         'status': UserVoteStatus.get.DOWNVOTE.value
    #     }
    #     response = c.post(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual('Vote updated', response.json()['message'])
    #     self.assertEqual(-1, self.getUserTotalVotes(targetVoteUser.id))

    def test_vote_user_invalid_vote_status_fails(self):
        targetVoteUser = User.objects.create(
            username = 'voteduser',
            email    = 'voteduser@email.com',
            password = self.newUser['password']
        )
        url = self.baseUrl + 'vote/' + str(targetVoteUser.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            'status': 4
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)
        self.assertEqual(0, self.getUserTotalVotes(targetVoteUser.id))

    def test_show_voted_users_success(self):
        url = self.baseUrl + 'vote/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        votedUser = self.generateNewUserObject()
        UserVote.objects.create(
            votedUserId = votedUser.id,
            voterId = user.id,
            status = UserVoteStatus.get.UPVOTE.value
        )

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 1)
        self.assertEqual(response.json()['results'][0]['userId'], votedUser.id)

    def test_update_my_status_message_success(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'updateStatusMessage/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        message = 'New Status Message'
        data = {
            'message': message
        }
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(message, UserExtend.objects.get(userId=user.id).statusMessage)

    def test_change_password_success(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'changePassword/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        newPassword = 'newPassword123*'
        data = {
            'current_password': Utils.get.TEST_USER_PASSWORD.value,
            'password': newPassword,
            'c_password': newPassword
        }
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(check_password(newPassword, User.objects.get(id=user.id).password))

    def test_change_password_wrong_current_password_fails(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'changePassword/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        newPassword = 'newPassword123*'
        data = {
            'current_password': Utils.get.TEST_USER_PASSWORD.value + 'password',
            'password': newPassword,
            'c_password': newPassword
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(check_password(newPassword, User.objects.get(id=user.id).password))

    def test_change_password_with_empty_array_fails(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'changePassword/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        newPassword = 'newPassword123*'
        data = {}
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_change_password_confirm_password_does_not_match_fails(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'changePassword/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        newPassword = 'newPassword123*'
        data = {
            'current_password': Utils.get.TEST_USER_PASSWORD.value + 'password',
            'password': newPassword,
            'c_password': newPassword + 'password'
        }
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_update_my_details_success(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'updateDetails/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        newUsername = self.generateRandomString(50)
        message = 'New Status Message'
        data = {
            'username' : newUsername,
            'message': message
        }
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(newUsername, User.objects.get(id=user.id).username)
        self.assertEqual(message, UserExtend.objects.get(userId=user.id).statusMessage)

    def test_update_my_details_success(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'updateDetails/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        newUsername = self.generateRandomString(50)
        message = 'New Status Message'
        data = {
            'username' : newUsername,
            'message': message
        }
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(newUsername, User.objects.get(id=user.id).username)
        self.assertEqual(message, UserExtend.objects.get(userId=user.id).statusMessage)

    def test_update_my_details_username_taken_fails(self):
        user = self.generateNewUserObject()
        url = self.baseUrl + 'updateDetails/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        newUsername = User.objects.create().username
        message = 'New Status Message'
        data = {
            'username' : newUsername,
            'message': message
        }
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)
        self.assertFalse(newUsername == User.objects.get(id=user.id).username)
        self.assertFalse(message == UserExtend.objects.get(userId=user.id).statusMessage)

from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus

class UserTestClass(TestCase):
    newUser = None
    baseUrl = '/api/user/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "test",
            "email": "test@email.com",
            "password": "password"
        }
    
    def createNewUser(self):
        return User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

    def getUserTotalVotes(self, userId):
        findUserVotes = UserVote.objects.filter(votedUserId = userId)
        totalVotes = 0
        for i in findUserVotes:
            totalVotes += i.status
        return totalVotes

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
            password = make_password(self.newUser['password'])
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
            password = make_password(self.newUser['password'])
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

    def test_update_vote_on_user_success(self):
        targetVoteUser = User.objects.create(
            username = 'voteduser',
            email    = 'voteduser@email.com',
            password = make_password(self.newUser['password'])
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

        # Send a different vote to update the vote
        data = {
            'status': UserVoteStatus.get.DOWNVOTE.value
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual('Vote updated', response.json()['message'])
        self.assertEqual(-1, self.getUserTotalVotes(targetVoteUser.id))

    def test_vote_user_invalid_vote_status_fails(self):
        targetVoteUser = User.objects.create(
            username = 'voteduser',
            email    = 'voteduser@email.com',
            password = make_password(self.newUser['password'])
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

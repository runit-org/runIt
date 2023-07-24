from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, EventMember, Event
from base.factories import UserFactory
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventMemberStatus
import random
import string
from django.utils import timezone
import datetime
from dateutil import parser

class UserTestClass(TestCase):
    newUser = None
    baseUrl = '/api/user/'

    def setUp(self):
        self.newUser = UserFactory.build().__dict__

    def generateRandomString(self, length):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(10))
    
    
    def createNewUser(self):
        user = User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = self.newUser['password']
        )
        userExtend = UserExtend.objects.create(
            userId = user.id,
        )

        return user
    
    def generateNewUserData(self):
        return UserFactory.build().__dict__

    def generateNewUserObject(self):
        randomUserData = self.generateNewUserData()
        user = User.objects.create(
            username   = randomUserData['username'],
            email      = randomUserData['email'],
            password   = randomUserData['password'] 
        )

        userExtend = UserExtend.objects.create(
            userId = user.id,
        )

        return user
    
    def generateNewEventData(self):
        tomorrow = datetime.date.today() + datetime.timedelta(days=1)
        newEvent = {
            "title"       : self.generateRandomString(5),
            "maxMember"   : 3,
            "details"     : self.generateRandomString(5),
            "year"        : tomorrow.year,
            "month"       : tomorrow.month,
            "day"         : tomorrow.day,
            "hour"        : 23,
            "minute"      : 59,
            "tags"        : "#hello"
        }
        return newEvent
    
    def generateNewEventObject(self):
        newRandomUser = self.generateNewUserObject()
        randomEventData = self.generateNewEventData()
        return Event.objects.create(
            user          = newRandomUser,
            title         = randomEventData['title'],
            maxMember     = randomEventData['maxMember'],
            userName      = newRandomUser.username,
            details       = randomEventData['details'],
            year          = randomEventData['year'],
            month         = randomEventData['month'],
            day           = randomEventData['day'],
            hour          = randomEventData['hour'],
            minute        = randomEventData["minute"],

            startDate   = timezone.make_aware(datetime.datetime(randomEventData['year'], randomEventData['month'], randomEventData['day'], randomEventData['hour'], randomEventData['minute'])),
            createdAt   = timezone.make_aware(datetime.datetime.now())
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

    def test_update_vote_on_user_success(self):
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

        # Send a different vote to update the vote
        data = {
            'status': UserVoteStatus.get.UPVOTE.value
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual('Vote updated', response.json()['message'])
        self.assertEqual(-1, self.getUserTotalVotes(targetVoteUser.id))

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

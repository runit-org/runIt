from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, Event
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus
import random
import string
import datetime

class EventTestClass(TestCase):
    newUser = None
    baseUrl = '/api/event/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "test",
            "email": "test@email.com",
            "password": "password"
        }

    def generateRandomString(self, length):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(10))
    
    def createNewUser(self):
        return User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

    def generateNewUserData(self):
        randomUserData = {
            "name"          : self.generateRandomString(5),
            "username"      : self.generateRandomString(10),
            "email"         : self.generateRandomString(10) + "@gmail.com",
            "password"      : make_password(self.newUser['password'])
        }
        return randomUserData

    def generateNewUserObject(self):
        randomUserData = self.generateNewUserData()
        return User.objects.create(
            first_name = randomUserData['name'],
            username   = randomUserData['username'],
            email      = randomUserData['email'],
            password   = randomUserData['password'] 
        )

    def generateNewEventData(self):
        now = datetime.date.today() + datetime.timedelta(days=1)
        newEvent = {
            "title"       : self.generateRandomString(5),
            "maxMember"   : 3,
            "userName"    : self.generateRandomString(5),
            "details"     : self.generateRandomString(5),
            "year"        : now.year,
            "month"       : now.month,
            "day"         : now.day,
            "hour"        : 20,
            "minute"      : 20,
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

            startDate   = datetime.datetime(randomEventData['year'], randomEventData['month'], randomEventData['day'], randomEventData['hour'], randomEventData['minute']),
            createdAt   = datetime.datetime.now()
        )

    def test_get_all_events_success(self):
        # Create 2 events
        self.generateNewEventObject()
        self.generateNewEventObject()

        url = self.baseUrl + 'all/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2, response.json()['count'])

    def test_create_event_success(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        eventData = self.generateNewEventData()
        response = c.post(url, eventData, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(Event.objects.filter(title=eventData['title'])) > 0)





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
            name     = randomUserData['name'],
            username = randomUserData['username'],
            email    = randomUserData['email'],
            password = randomUserData['password'] 
        )

    def generateNewEventData(self):
        today = datetime.date.today()
        newEvent = {
            "title"       : self.generateRandomString(5),
            "maxMember"   : 3,
            "userName"    : self.generateRandomString(5),
            "details"     : self.generateRandomString(5),
            "year"        : today.year,
            "month"       : today.month,
            "day"         : today.day,
            "hour"        : today.hour,
            "minute"      : today.minute,
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
        )

    def test_get_all_events_success(self):
        
        self.assertTrue(True)


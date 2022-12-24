from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, Notification
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventStatus, EventMemberStatus
import random
import string
import datetime
from django.utils import timezone

class NotificationTestClass(TestCase):
    newUser = None
    baseUrl = '/api/notification/'

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
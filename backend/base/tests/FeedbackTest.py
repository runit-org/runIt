from django.test import TestCase
from django.test import Client
from base.models import User, Feedback
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.factories import UserFactory
import random
import string
import datetime
from django.utils import timezone

from django.db.models import Q


class FeedbackTestClass(TestCase):
    newUser = None
    baseUrl = '/api/feedback/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "testuser",
            "email": "test@email.com",
            "password": "password123*"
        }

    def generateRandomString(self, length):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(10))

    def createNewUser(self):
        return User.objects.create(
            username=self.newUser['username'],
            email=self.newUser['email'],
            password=make_password(self.newUser['password'])
        )

    def generateNewUserData(self):
        return UserFactory.build().__dict__

    def generateNewUserObject(self):
        randomUserData = self.generateNewUserData()
        return User.objects.create(
            username=randomUserData['username'],
            email=randomUserData['email'],
            password=randomUserData['password']
        )

    def test_create_feedback_success(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "details": self.generateRandomString(15)
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(Feedback.objects.filter(details=data['details'])) > 0)

    def test_create_feedback_with_empty_array_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {}
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)
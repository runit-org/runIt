from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.test import APIRequestFactory


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

    def test_get_user_profile_success(self):
        self.assertTrue(True)
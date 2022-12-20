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
    
    def createNewUser(self):
        return User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

    def test_get_user_profile_success(self):
        c = Client()
        url = self.baseUrl + 'profile/' + self.newUser['username'] + '/'

        user = self.createNewUser()
        print(user)
        c.force_login(user)
        # logged_in = c.login(username=self.newUser['username'], password=self.newUser['password'])
        response = c.get(url, {}, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
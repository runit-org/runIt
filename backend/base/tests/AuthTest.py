from django.test import TestCase
from django.test import Client
from base.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.test import APIRequestFactory


class AuthTestClass(TestCase):
    newUser = None
    baseUrl = '/api/auth/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "test",
            "email": "test@email.com",
            "password": "password"
        }

    def createNewUser(self):
        User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

    def test_login_success(self):
        c = Client()
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {
            'username': self.newUser['username'],
            'password': self.newUser['password']
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_empty_fields_fails(self):
        c = Client()
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {}
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_login_invalid_credentials_fails(self):
        c = Client()
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {
            'username': self.newUser['username'] + 'zzz',
            'password': self.newUser['password'] + 'zzz'
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_register_success(self):
        c = Client()
        url = self.baseUrl + 'register/'

        data = self.newUser
        data['c_password'] = data['password']
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(User.objects.get(username=self.newUser['username']).username == self.newUser['username'])

    def test_register_empty_fields_fails(self):
        c = Client()
        url = self.baseUrl + 'register/'

        data = {}
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_register_user_confirm_password_not_match_fails(self):
        c = Client()
        url = self.baseUrl + 'register/'

        data = self.newUser
        data['c_password'] = data['password'] + 'zzz'
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_username_and_email_taken_fails(self):
        c = Client()
        url = self.baseUrl + 'register/'

        self.createNewUser()
        data = self.newUser
        data['c_password'] = data['password']
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_with_not_allowed_username_fails(self):
        c = Client()
        url = self.baseUrl + 'register/'

        self.createNewUser()
        data = self.newUser
        data['username'] = 'everyone'
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_logout_success(self):
        c = Client()
        url = self.baseUrl + 'logout/'
        loginUrl = self.baseUrl + 'login/'
        refreshUrl = self.baseUrl + 'token/refresh/'

        user = self.createNewUser()

        # Get refresh token from login api
        loginData = {
            'username': self.newUser['username'],
            'password': self.newUser['password']
        }
        responseLogin = c.post(loginUrl, loginData, format='json')
        refreshToken = responseLogin.json()['refresh']

        # Then use the refresh token for logout
        data = {
            'refresh': refreshToken
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Finally check if the refresh token is still valid
        responseRefToken = c.post(refreshUrl, data, format='json')
        self.assertFalse(responseRefToken.status_code == status.HTTP_200_OK)

    def test_logout_empty_fields_fails(self):
        c = Client()
        url = self.baseUrl + 'logout/'
        loginUrl = self.baseUrl + 'login/'

        user = self.createNewUser()

        # Get refresh token from login api
        loginData = {
            'username': self.newUser['username'],
            'password': self.newUser['password']
        }
        responseLogin = c.post(loginUrl, loginData, format='json')
        refreshToken = responseLogin.json()['refresh']

        # Then use the refresh token for logout
        data = {}
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_refresh_token_success(self):
        c = Client()
        url = self.baseUrl + 'token/refresh/'
        loginUrl = self.baseUrl + 'login/'
        

        user = self.createNewUser()

        # Get refresh token from login api
        loginData = {
            'username': self.newUser['username'],
            'password': self.newUser['password']
        }
        responseLogin = c.post(loginUrl, loginData, format='json')
        refreshToken = responseLogin.json()['refresh']

        # Get access token from refresh token api
        data = {
            'refresh': refreshToken
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check if access token is returned from the refresh token api
        self.assertTrue('access' in response.json())



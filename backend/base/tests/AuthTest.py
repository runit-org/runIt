from django.test import TestCase
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
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {
            'username': self.newUser['username'],
            'password': self.newUser['password']
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_empty_fields_fails(self):
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {
        }
        response = self.client.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_login_invalid_credentials_fails(self):
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {
            'username': self.newUser['username'] + 'zzz',
            'password': self.newUser['password'] + 'zzz'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_register_success(self):
        url = self.baseUrl + 'register/'

        data = {
            'name': self.newUser['name'],
            'username': self.newUser['username'],
            'email': self.newUser['email'],
            'password': self.newUser['password'],
            'c_password': self.newUser['password']
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(User.objects.get(username=self.newUser['username']).username == self.newUser['username'])

    def test_register_empty_fields_fails(self):
        url = self.baseUrl + 'register/'

        data = {
        }
        response = self.client.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_register_user_confirm_password_not_match_fails(self):
        url = self.baseUrl + 'register/'

        data = {
            'name': self.newUser['name'],
            'username': self.newUser['username'],
            'email': self.newUser['email'],
            'password': self.newUser['password'],
            'c_password': self.newUser['password'] + 'zzz'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_username_and_email_taken_fails(self):
        url = self.baseUrl + 'register/'

        self.createNewUser()
        data = {
            'name': self.newUser['name'],
            'username': self.newUser['username'],
            'email': self.newUser['email'],
            'password': self.newUser['password'],
            'c_password': self.newUser['password']
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)





from django.test import TestCase
from base.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.test import APIRequestFactory

class AuthTestClass(TestCase):
    def setUp(self):
        User.objects.create(
            username = 'test',
            email    = 'test@email.com',
            password = make_password('password')
        )

    def test_login_success(self):
        url = '/auth/login/'
        data = {
            'username': 'test',
            'email': "test@email.com",
            'password': 'password'
        }
        response = self.client.post(url, data, format='json')
        print(response)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
from django.test import TestCase
from base.models import User
from django.contrib.auth.hashers import make_password

class AuthTestClass(TestCase):
    def setUp(self):
        User.objects.create(
            username = 'test',
            email    = 'test@email.com',
            password = make_password('password')
        )

    def test_first_test(self):
        self.assertEqual(1, 1)
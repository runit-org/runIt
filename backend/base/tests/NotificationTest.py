from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, Notification
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventStatus, EventMemberStatus, NotificationStatus
from base.factories import UserFactory, EventFactory
import random
import string
import datetime
from django.utils import timezone

class NotificationTestClass(TestCase):
    newUser = None
    baseUrl = '/api/notifications/'

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
        user = User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

        UserExtend.objects.create(
            userId = user.id,
            isEmailVerified = True
        )

        return user

    def generateNewUserData(self):
        return UserFactory.build().__dict__

    def generateNewUserObject(self):
        randomUserData = self.generateNewUserData()
        user = User.objects.create(
            username   = randomUserData['username'],
            email      = randomUserData['email'],
            password   = randomUserData['password'] 
        )

        UserExtend.objects.create(
            userId = user.id,
            isEmailVerified = True
        )

        return user

    def generateNewNotificationObject(self, user):
        return Notification.objects.create(
            userId = user.id,
            details = 'Hello World',
            link = '',

            createdAt = timezone.make_aware(datetime.datetime.now())
        )
    
    def test_get_current_user_notifications_success(self):
        url = self.baseUrl + 'all/'
        user = self.generateNewUserObject()

        self.generateNewNotificationObject(user)
        self.generateNewNotificationObject(user)

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 2)

    def test_read_one_user_notification_success(self):
        user = self.generateNewUserObject()
        notif = self.generateNewNotificationObject(user)

        url = self.baseUrl + 'read/' + str(notif.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.patch(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Notification.objects.get(id=notif.id).status == NotificationStatus.get.READ.value)

    def test_read_all_user_notification_success(self):
        url = self.baseUrl + 'readAll/'
        user = self.generateNewUserObject()

        self.generateNewNotificationObject(user)
        self.generateNewNotificationObject(user)
        self.generateNewNotificationObject(user)

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.patch(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(Notification.objects.filter(userId=user.id, status=NotificationStatus.get.UNREAD.value)) == 0)
    

from django.test import TestCase
from base.tests import BaseTestClass
from django.test import Client
from base.models import User, UserExtend, UserVote, EventMember, Event
from base.factories import UserFactory
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import ActivityLogTypes
import random
import string
from django.utils import timezone
import datetime
from dateutil import parser
from django.contrib.auth.hashers import check_password

class ActivityLogTestClass(BaseTestClass):
    newUser = None
    baseUrl = '/api/user/activity/'

    def setUp(self):
        self.newUser = UserFactory.build().__dict__

    def test_get_current_user_activity_log_success(self):
        user = self.generateNewUserObject()
        self.generateNewUserActivityObject(user)

        url = self.baseUrl + user.username + '/'
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 1)

    def test_activity_log_contains_title_and_type_success(self):
        user = self.generateNewUserObject()
        self.generateNewUserActivityObject(user)

        url = self.baseUrl + user.username + '/'
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        keys = ['title', 'type']
        response = c.get(url, {}, format='json')
        # print(response.json()['results'][0])
        self.assertTrue(all(key in response.json()['results'][0] for key in keys))

    def test_user_view_their_own_activity_logs_should_show_private_activities_success(self):
        user = self.generateNewUserObject()
        self.generateNewUserActivityObject(user, ActivityLogTypes.get.ACCOUNT.value)
        self.generateNewUserActivityObject(user, ActivityLogTypes.get.FEEDBACK.value)

        url = self.baseUrl + user.username + '/'
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 2)

    def test_user_view_others_activity_logs_should_not_show_private_activities_success(self):
        user = self.generateNewUserObject()
        self.generateNewUserActivityObject(user, ActivityLogTypes.get.ACCOUNT.value)
        self.generateNewUserActivityObject(user, ActivityLogTypes.get.FEEDBACK.value)
        self.generateNewUserActivityObject(user, ActivityLogTypes.get.FRIENDS.value)

        url = self.baseUrl + user.username + '/'
        # Authenticate user-------------------------------------------
        differentUser = self.generateNewUserObject()
        user = User.objects.get(username=differentUser.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 1)

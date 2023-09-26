from django.test import TestCase
from base.tests import BaseTestClass
from django.test import Client
from base.models import User, UserExtend, UserVote, EventMember, Event
from base.factories import UserFactory
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventMemberStatus, Utils
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
        url = self.baseUrl
        user = self.generateNewUserObject()

        self.generateNewUserActivityObject(user)

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 1)

    def test_activity_log_contains_title_and_type_success(self):
        url = self.baseUrl
        user = self.generateNewUserObject()

        self.generateNewUserActivityObject(user)

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        keys = ['title', 'type']
        response = c.get(url, {}, format='json')
        # print(response.json()['results'][0])
        self.assertTrue(all(key in response.json()['results'][0] for key in keys))

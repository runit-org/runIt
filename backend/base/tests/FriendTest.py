from django.test import TestCase
from django.test import Client
from base.models import User, Friend, FriendRequest
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventStatus, EventMemberStatus, NotificationStatus
import random
import string
import datetime
from django.utils import timezone

from django.db.models import Q

class FriendTestClass(TestCase):
    newUser = None
    baseUrl = '/api/friends/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "test",
            "email": "test@email.com",
            "password": "password"
        }

    def generateRandomString(self, length):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(10))
    
    def createNewUser(self):
        return User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

    def generateNewUserData(self):
        randomUserData = {
            "name"          : self.generateRandomString(5),
            "username"      : self.generateRandomString(10),
            "email"         : self.generateRandomString(10) + "@gmail.com",
            "password"      : make_password(self.newUser['password'])
        }
        return randomUserData

    def generateNewUserObject(self):
        randomUserData = self.generateNewUserData()
        return User.objects.create(
            first_name = randomUserData['name'],
            username   = randomUserData['username'],
            email      = randomUserData['email'],
            password   = randomUserData['password'] 
        )

    def generateNewFriendsObject(self):
        return Friend.objects.create(
            user1 = self.generateNewUserObject(),
            user2 = self.generateNewUserObject()
        )

    def generateNewFriendRequestObject(self):
        return FriendRequest.objects.create(
            main = self.generateNewUserObject(),
            requester = self.generateNewUserObject()
        )

    def checkAlreadyFriends(self, user1, user2):
        checkFriendshipExist = Friend.objects.filter(
            Q(user1=user1) | Q(user1=user2),
            Q(user2=user1) | Q(user2=user2)
            )
        
        if len(checkFriendshipExist) > 0:
            return True
        else:
            return False

    def test_send_friend_request_success(self):
        requester = self.generateNewUserObject()
        targetUser = self.generateNewUserObject()

        url = self.baseUrl + 'request/' + str(targetUser.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=requester.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(FriendRequest.objects.filter(main=targetUser, requester=requester)) > 0)

    def test_send_cancel_friend_request_success(self):
        friendRequestObject = self.generateNewFriendRequestObject()
        requester = friendRequestObject.requester
        targetUser = friendRequestObject.main

        url = self.baseUrl + 'request/' + str(targetUser.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=requester.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(len(FriendRequest.objects.filter(main=targetUser, requester=requester)) > 0)

    def test_send_friend_request_target_user_already_requested_a_friendship_fails(self):
        friendRequestObject = self.generateNewFriendRequestObject()
        targetUser = friendRequestObject.requester
        requester = friendRequestObject.main

        url = self.baseUrl + 'request/' + str(targetUser.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=requester.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(len(FriendRequest.objects.filter(main=targetUser, requester=requester)) > 0)
    
    def test_send_friend_request_already_friends_fails(self):
        friendshipObject = self.generateNewFriendsObject()
        targetUser = friendshipObject.user1
        requester = friendshipObject.user2

        url = self.baseUrl + 'request/' + str(targetUser.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=requester.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(len(FriendRequest.objects.filter(main=targetUser, requester=requester)) > 0)

    def test_respond_friend_request_success(self):
        friendRequestObject = self.generateNewFriendRequestObject()
        requester = friendRequestObject.requester
        targetUser = friendRequestObject.main

        url = self.baseUrl + 'respond/' + str(requester.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=targetUser.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "respond" : 1
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.checkAlreadyFriends(requester, targetUser))

    

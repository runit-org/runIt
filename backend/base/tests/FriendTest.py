from django.test import TestCase
from django.test import Client
from base.models import User, Friend, FriendRequest, UserExtend
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

from django.db.models import Q


class FriendTestClass(TestCase):
    newUser = None
    baseUrl = '/api/friends/'

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

    def generateNewFriendsObject(self, user1=None, user2=None):
        return Friend.objects.create(
            user1=user1 if user1 else self.generateNewUserObject(),
            user2=user2 if user2 else self.generateNewUserObject()
        )

    def generateNewFriendRequestObject(self, main=None, requester=None):
        return FriendRequest.objects.create(
            main=main if main else self.generateNewUserObject(),
            requester=requester if requester else self.generateNewUserObject()
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
        self.assertTrue(len(FriendRequest.objects.filter(
            main=targetUser, requester=requester)) > 0)

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
        self.assertFalse(len(FriendRequest.objects.filter(
            main=targetUser, requester=requester)) > 0)

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
        self.assertFalse(len(FriendRequest.objects.filter(
            main=targetUser, requester=requester)) > 0)

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
        self.assertFalse(len(FriendRequest.objects.filter(
            main=targetUser, requester=requester)) > 0)

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
            "respond": 1
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.checkAlreadyFriends(requester, targetUser))

    def test_respond_friend_request_request_does_not_exist_fails(self):
        requester = self.generateNewUserObject()
        targetUser = self.generateNewUserObject()

        url = self.baseUrl + 'respond/' + str(requester.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=targetUser.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "respond": 1
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(self.checkAlreadyFriends(requester, targetUser))

    def test_respond_friend_request_current_user_is_requesting_friendship_to_target_user_fails(self):
        friendRequestObject = self.generateNewFriendRequestObject()
        requester = friendRequestObject.main
        targetUser = friendRequestObject.requester

        url = self.baseUrl + 'respond/' + str(requester.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=targetUser.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "respond": 1
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(self.checkAlreadyFriends(requester, targetUser))

    def test_respond_friend_request_invalid_respond_data_fails(self):
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
            "respond": "yes"
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_422_UNPROCESSABLE_ENTITY)
        self.assertFalse(self.checkAlreadyFriends(requester, targetUser))

    def test_respond_friend_request_already_friends_fails(self):
        friendsObject = self.generateNewFriendsObject()
        requester = friendsObject.user1
        targetUser = friendsObject.user2

        url = self.baseUrl + 'respond/' + str(requester.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=targetUser.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "respond": 1
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_show_all_accepted_friends_success(self):
        numFriends = 5
        url = self.baseUrl + 'show/'

        mainUser = self.generateNewUserObject()
        for i in range(numFriends):
            self.generateNewFriendsObject(mainUser)

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=mainUser.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(numFriends, response.json()['count'])

    def test_show_all_friend_requests_on_current_user_success(self):
        numRequests = 5
        url = self.baseUrl + 'showRequests/'

        mainUser = self.generateNewUserObject()
        for i in range(numRequests):
            self.generateNewFriendRequestObject(mainUser)

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=mainUser.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(numRequests, response.json()['count'])

    def test_delete_friendship_success(self):
        friendsObject = self.generateNewFriendsObject()
        user1 = friendsObject.user1
        user2 = friendsObject.user2

        url = self.baseUrl + 'delete/' + str(user2.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(self.checkAlreadyFriends(user1, user2))

    def test_delete_friendship_on_self_fails(self):
        friendsObject = self.generateNewFriendsObject()
        user1 = friendsObject.user1
        user2 = friendsObject.user2

        url = self.baseUrl + 'delete/' + str(user1.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(self.checkAlreadyFriends(user1, user2))

    def test_delete_friendship_not_friends_fails(self):
        user1 = self.generateNewUserObject()
        user2 = self.generateNewUserObject()

        url = self.baseUrl + 'delete/' + str(user2.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(self.checkAlreadyFriends(user1, user2))

    def test_delete_friendship_user_id_not_found_failse(self):
        user1 = self.generateNewUserObject()
        user2 = self.generateNewUserObject()

        url = self.baseUrl + 'delete/1000/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(self.checkAlreadyFriends(user1, user2))

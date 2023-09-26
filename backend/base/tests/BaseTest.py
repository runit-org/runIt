from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, Event, EventMember, EventComment, EventCommentLike, Friend, FriendRequest, Notification, UserActivity
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventStatus, EventMemberStatus, ActivityLogTypes
from base.factories import EventFactory, UserFactory
import random
import string
import datetime
from django.utils import timezone
from django.db.models import Q

class BaseTestClass(TestCase):
    baseUrl = '/api/feedback/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "testuser",
            "email": "test@email.com",
            "password": "password123*"
        }

    def generateRandomString(self, length=10):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(length))

    def createNewUser(self):
        user = User.objects.create(
            username=self.newUser['username'],
            email=self.newUser['email'],
            password=make_password(self.newUser['password'])
        )

        UserExtend.objects.create(
            userId=user.id,
            isEmailVerified=True
        )

        return user

    def generateNewUserData(self):
        return UserFactory.build().__dict__

    def generateNewUserObject(self):
        randomUserData = self.generateNewUserData()
        user = User.objects.create(
            username=randomUserData['username'],
            email=randomUserData['email'],
            password=randomUserData['password']
        )

        UserExtend.objects.create(
            userId=user.id,
            isEmailVerified=True
        )

        return user
    
    def generateNewEventData(self):
        event = EventFactory.build().__dict__
        event.pop('_state', None)
        return event
    
    def generateNewEventObject(self):
        newRandomUser = self.generateNewUserObject()
        randomEventData = self.generateNewEventData()
        return Event.objects.create(
            user          = newRandomUser,
            title         = randomEventData['title'],
            maxMember     = randomEventData['maxMember'],
            details       = randomEventData['details'],
            year          = randomEventData['year'],
            month         = randomEventData['month'],
            day           = randomEventData['day'],
            hour          = randomEventData['hour'],
            minute        = randomEventData["minute"],

            startDate   = timezone.make_aware(datetime.datetime(randomEventData['year'], randomEventData['month'], randomEventData['day'], randomEventData['hour'], randomEventData['minute'])),
            createdAt   = timezone.make_aware(datetime.datetime.now())
        )
    
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
        
    def generateNewNotificationObject(self, user):
        return Notification.objects.create(
            userId = user.id,
            details = 'Hello World',
            link = '',

            createdAt = timezone.make_aware(datetime.datetime.now())
        )
    
    def generateNewUserActivityObject(self, user):
        return UserActivity.objects.create(
            userId = user.id,
            details = 'Hello World',
            link = '',
            title = 'Title Placeholder',
            type = ActivityLogTypes.get.ACCOUNT.value,

            createdAt = timezone.make_aware(datetime.datetime.now())
        )
    
    def getUserTotalVotes(self, userId):
        findUserVotes = UserVote.objects.filter(votedUserId = userId)
        totalVotes = 0
        for i in findUserVotes:
            totalVotes += i.status
        return totalVotes

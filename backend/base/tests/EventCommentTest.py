from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, Event, EventMember, EventComment, EventCommentLike
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventStatus, EventMemberStatus
from base.factories import EventFactory, UserFactory
import random
import string
import datetime
from django.utils import timezone

class EventCommentTestClass(TestCase):
    newUser = None
    baseUrl = '/api/event/'

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
        return User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

    def generateNewUserData(self):
        return UserFactory.build().__dict__

    def generateNewUserObject(self):
        randomUserData = self.generateNewUserData()
        return User.objects.create(
            username   = randomUserData['username'],
            email      = randomUserData['email'],
            password   = randomUserData['password'] 
        )

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

    def test_create_event_comment_as_event_owner_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/create/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        data = {
            "content" : "Hello World"
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(EventComment.objects.get(user=user, event=eventObject).content == data['content'])

    def test_create_event_comment_as_accepted_event_member_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/create/' + str(eventObject.id) + '/'

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        data = {
            "content" : "Hello World"
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(EventComment.objects.get(user=user, event=eventObject).content == data['content'])

    def test_create_event_comment_with_empty_data_array_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/create/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        data = {}
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_create_event_comment_as_non_member_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/create/' + str(eventObject.id) + '/'

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "content" : "Hello World"
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_create_event_comment_as_non_accepted_member_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/create/' + str(eventObject.id) + '/'

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.PENDING.value
        )

        data = {
            "content" : "Hello World"
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_create_event_comment_on_a_non_active_event_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/create/' + str(eventObject.id) + '/'

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.PENDING.value
        )

        eventObject.status = EventStatus.get.FINISHED.value
        eventObject.save()

        data = {
            "content" : "Hello World"
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_show_event_comments_as_event_owner_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/show/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        member1 = self.generateNewUserObject()
        EventComment.objects.create(
            user = member1,
            event = eventObject,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now())
        )
        
        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 1)

    def test_show_event_comment_as_an_accepted_member_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/show/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = user.id,
            user = user,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        member1 = self.generateNewUserObject()
        EventComment.objects.create(
            user = member1,
            event = eventObject,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now())
        )
        # Try adding a second command to test
        member2 = self.generateNewUserObject()
        EventComment.objects.create(
            user = member2,
            event = eventObject,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now())
        )
        
        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['count'] == 2)

    def test_show_event_comment_as_a_non_accepted_member_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/show/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = user.id,
            user = user,
            status = EventMemberStatus.get.PENDING.value
        )

        member1 = self.generateNewUserObject()
        EventComment.objects.create(
            user = member1,
            event = eventObject,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now())
        )
        
        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_show_event_comment_as_non_member_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/show/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_update_event_comment_success(self):
        eventObject = self.generateNewEventObject()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        comment = EventComment.objects.create(
            event = eventObject,
            user = user,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/update/' + str(comment.id) + '/'

        data = {
            "content" : "Hello World"
        }
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(EventComment.objects.get(user=user, event=eventObject).content == data['content'])

    def test_update_event_comment_not_comment_writer_fails(self):
        eventObject = self.generateNewEventObject()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        otherUser = self.generateNewUserObject()
        comment = EventComment.objects.create(
            event = eventObject,
            user = otherUser,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/update/' + str(comment.id) + '/'

        data = {
            "content" : "Hello World"
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_delete_comment_success(self):
        eventObject = self.generateNewEventObject()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        comment = EventComment.objects.create(
            event = eventObject,
            user = user,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/delete/' + str(comment.id) + '/'

        response = c.delete(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(EventComment.objects.filter(id=eventObject.id)) < 1)

    def test_delete_comment_not_comment_writer_fails(self):
        eventObject = self.generateNewEventObject()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        otherUser = self.generateNewUserObject()
        comment = EventComment.objects.create(
            event = eventObject,
            user = otherUser,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/delete/' + str(comment.id) + '/'

        response = c.delete(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(EventComment.objects.filter(id=eventObject.id)) > 0)

    def test_like_event_comment_success(self):
        eventObject = self.generateNewEventObject()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        comment = EventComment.objects.create(
            event = eventObject,
            user = user,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/likeUnlike/' + str(comment.id) + '/'

        response = c.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(EventCommentLike.objects.filter(eventComment=comment, user=user)) > 0)

    def test_unlike_event_comment_success(self):
        eventObject = self.generateNewEventObject()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        comment = EventComment.objects.create(
            event = eventObject,
            user = user,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/likeUnlike/' + str(comment.id) + '/'

        # Create a comment object first so it can be unliked
        EventCommentLike.objects.create(
            eventComment = comment,
            user = user
        )

        response = c.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(EventCommentLike.objects.filter(eventComment=comment, user=user)) < 1)

    def test_like_event_comment_not_accepted_member_fails(self):
        eventObject = self.generateNewEventObject()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.PENDING.value
        )

        comment = EventComment.objects.create(
            event = eventObject,
            user = user,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/likeUnlike/' + str(comment.id) + '/'

        response = c.post(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_like_event_comment_event_no_longer_active_fails(self):
        eventObject = self.generateNewEventObject()
        eventObject.status = EventStatus.get.CANCELLED.value
        eventObject.save()

        # Authenticated user is an accepted event member
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        EventMember.objects.create(
            user = user,
            userId = user.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        comment = EventComment.objects.create(
            event = eventObject,
            user = user,
            content = "Hello World",
            createdAt = timezone.make_aware(datetime.datetime.now()),
        )
        url = self.baseUrl + 'comment/likeUnlike/' + str(comment.id) + '/'

        # Create a comment object first so it can be unliked
        EventCommentLike.objects.create(
            eventComment = comment,
            user = user
        )

        response = c.post(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

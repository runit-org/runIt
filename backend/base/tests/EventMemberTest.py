from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, Event, EventMember, EventComment, EventCommentLike
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventStatus, EventMemberStatus
from base.factories import UserFactory, EventFactory
import random
import string
import datetime
from django.utils import timezone

class EventMemberTestClass(TestCase):
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
        user = User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

        UserExtend.objects.create(
            userId = user.id
        )

        return user

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

    def test_request_join_event_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Make sure the status of this user on this event is PENDING
        self.assertEqual(EventMemberStatus.get.PENDING.value, EventMember.objects.get(user = user, event = eventObject).status)

    def test_request_join_event_with_empty_array_data_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {}
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_request_join_event_id_not_found_fails(self):
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "eventId" : 1
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_a_cancelled_event_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        eventObject.status = EventStatus.get.CANCELLED.value
        eventObject.save()

        data = {
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(EventMember.objects.filter(user=user, event=eventObject)) < 1)

    def test_request_join_an_ongoing_event_fails(self):
        eventObject = self.generateNewEventObject()
        eventObject.startDate = timezone.make_aware(datetime.datetime.now())
        eventObject.save()
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        data = {
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(EventMember.objects.filter(user=user, event=eventObject)) < 1)

    def test_request_join_a_full_event_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        eventObject.maxMember = 2
        eventObject.save()

        member1 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member1.id,
            user = member1,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        member2 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member2.id,
            user = member2,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        # The authenticated user wouldn't be the event owner
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(EventMember.objects.filter(event=eventObject, status=EventMemberStatus.get.PENDING.value)) == 0)

    def test_request_join_your_own_event_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        # Test authenticating the event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(EventMember.objects.filter(user=user, event=eventObject)) < 1)

    def test_request_join_event_already_pending_request_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
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
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_event_already_part_of_event_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
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
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_event_request_already_denied_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/requestJoin/'

        # The authenticated user wouldn't be the event owner
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
            status = EventMemberStatus.get.REJECTED.value
        )

        data = {
            "eventId" : eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_get_event_members_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/getMembers/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        member1 = self.generateNewUserObject()
        EventMember.objects.create(
            user = member1,
            userId = member1.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )
        member2 = self.generateNewUserObject()
        EventMember.objects.create(
            user = member2,
            userId = member2.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == 2)

    def test_get_event_members_event_id_not_found_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/getMembers/' + str(eventObject.id  + 1) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_change_event_member_status_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        member1 = self.generateNewUserObject()
        EventMember.objects.create(
            user = member1,
            userId = member1.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.PENDING.value
        )

        data = {
            "eventId" : eventObject.id,
            "userId" : member1.id,
            "status" : EventMemberStatus.get.ACCEPTED.value
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(EventMember.objects.get(user=member1, event=eventObject).status == EventMemberStatus.get.ACCEPTED.value)

    def test_remove_pending_event_member_request_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        member1 = self.generateNewUserObject()
        EventMember.objects.create(
            user = member1,
            userId = member1.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.PENDING.value
        )

        data = {
            "eventId" : eventObject.id,
            "userId" : member1.id,
            "status" : EventMemberStatus.get.DELETED.value
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(EventMember.objects.filter(user=member1, event=eventObject)) == 0)

    def test_approve_event_member_request_on_previously_rejected_user_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        member1 = self.generateNewUserObject()
        EventMember.objects.create(
            user = member1,
            userId = member1.id,
            event = eventObject,
            eventId = eventObject.id,
            status = EventMemberStatus.get.REJECTED.value
        )

        data = {
            "eventId" : eventObject.id,
            "userId" : member1.id,
            "status" : EventMemberStatus.get.ACCEPTED.value
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(EventMember.objects.get(user=member1, event=eventObject).status == EventMemberStatus.get.REJECTED.value)

    def test_change_event_member_status_with_empty_data_array_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        data = {}
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_change_event_member_status_invalid_member_status_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        data = {
            "eventId" : 1,
            "userId" : 1,
            "status" : 1000
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    def test_change_event_member_status_user_id_not_found_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        data = {
            "eventId" : 1,
            "userId" : 1000,
            "status" : EventMemberStatus.get.ACCEPTED.value
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_change_event_member_status_event_id_not_found_fails(self):
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        member1 = self.generateNewUserObject()
        
        data = {
            "eventId" : 1000,
            "userId" : member1.id,
            "status" : EventMemberStatus.get.ACCEPTED.value
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_accepting_member_request_when_event_is_full_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        eventObject.maxMember = 2
        eventObject.save()

        member1 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member1.id,
            user = member1,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        member2 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member2.id,
            user = member2,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        member3 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member3.id,
            user = member3,
            status = EventMemberStatus.get.PENDING.value
        )

        data = {
            "eventId" : eventObject.id,
            "userId" : member3.id,
            "status" : EventMemberStatus.get.ACCEPTED.value
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_rejecting_member_request_when_event_is_full_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        eventObject.maxMember = 2
        eventObject.save()

        member1 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member1.id,
            user = member1,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        member2 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member2.id,
            user = member2,
            status = EventMemberStatus.get.ACCEPTED.value
        )

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        member3 = self.generateNewUserObject()
        EventMember.objects.create(
            eventId = eventObject.id,
            event = eventObject,
            userId = member3.id,
            user = member3,
            status = EventMemberStatus.get.PENDING.value
        )

        data = {
            "eventId" : eventObject.id,
            "userId" : member3.id,
            "status" : EventMemberStatus.get.REJECTED.value
        }
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)

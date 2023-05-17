from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, Event, EventMember, EventComment, EventCommentLike
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import UserVoteStatus, EventStatus, EventMemberStatus
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

    def generateNewEventData(self):
        tomorrow = datetime.date.today() + datetime.timedelta(days=1)
        newEvent = {
            "title"       : self.generateRandomString(5),
            "maxMember"   : 15,
            "details"     : self.generateRandomString(5),
            "year"        : tomorrow.year,
            "month"       : tomorrow.month,
            "day"         : tomorrow.day,
            "hour"        : 23,
            "minute"      : 59,
        }
        return newEvent
    
    def generateNewEventObject(self):
        newRandomUser = self.generateNewUserObject()
        randomEventData = self.generateNewEventData()
        return Event.objects.create(
            user          = newRandomUser,
            title         = randomEventData['title'],
            maxMember     = randomEventData['maxMember'],
            userName      = newRandomUser.username,
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
        user = User.objects.get(username=eventObject.userName)
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
        user = User.objects.get(username=eventObject.userName)
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
        user = User.objects.get(username=eventObject.userName)
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
        user = User.objects.get(username=eventObject.userName)
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

    def test_change_event_member_status_with_empty_data_array_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'member/changeStatus/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
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
        user = User.objects.get(username=eventObject.userName)
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
        user = User.objects.get(username=eventObject.userName)
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

    
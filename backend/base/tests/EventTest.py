from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, Event, EventMember, EventComment
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

class EventTestClass(TestCase):
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
            "maxMember"   : 3,
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

    def test_get_all_events_success(self):
        # Create 2 events
        self.generateNewEventObject()
        self.generateNewEventObject()

        url = self.baseUrl + 'all/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2, response.json()['count'])

    def test_create_event_success(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        eventData = self.generateNewEventData()
        response = c.post(url, eventData, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(Event.objects.filter(title=eventData['title'])) > 0)

    def test_create_event_empty_data_values_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_create_event_max_member_less_than_two_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        eventData = self.generateNewEventData()
        eventData['maxMember'] = 1
        response = c.post(url, eventData, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_create_event_start_date_in_the_past_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        eventData = self.generateNewEventData()
        eventData['year'] = 2000
        response = c.post(url, eventData, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_view_event_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'view/' + str(eventObject.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(eventObject.userName, response.json()['data']['userName'])
        self.assertEqual(eventObject.id, response.json()['data']['id'])

    def test_view_event_id_not_found_fails(self):
        url = self.baseUrl + 'view/1/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_update_event_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'update/' + str(eventObject.id) + '/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.generateNewEventData()
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data['title'], Event.objects.get(id=eventObject.id).title)

    def test_update_event_not_event_owner_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'update/' + str(eventObject.id) + '/'

        # Test updating as not event owner fails
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.generateNewEventData()
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_update_event_with_empty_array_data_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'update/' + str(eventObject.id) + '/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {}
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_update_event_less_than_two_max_members_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'update/' + str(eventObject.id) + '/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.generateNewEventData()
        data['maxMember'] = 1
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_update_event_status_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'updateStatus/' + str(eventObject.id) + '/'
        eventStatus = EventStatus.get.CANCELLED.value

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "status" : eventStatus
        }
        response = c.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(eventStatus, Event.objects.get(id=eventObject.id).status)

    def test_update_event_status_not_event_owner_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'updateStatus/' + str(eventObject.id) + '/'
        eventStatus = EventStatus.get.CANCELLED.value

        # Test updating as not event owner fails
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "status" : eventStatus
        }
        response = c.patch(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_update_event_status_with_empty_data_array_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'updateStatus/' + str(eventObject.id) + '/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {}
        response = c.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_update_event_status_invalid_status_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'updateStatus/' + str(eventObject.id) + '/'
        eventStatus = EventStatus.get.PENDING.value

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "status" : eventStatus
        }
        response = c.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_delete_event_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'delete/' + str(eventObject.id) + '/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(Event.objects.filter(id=eventObject.id)) < 1)

    def test_delete_event_id_not_found_fails(self):
        url = self.baseUrl + 'delete/1/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_delete_event_as_not_event_owner_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'delete/' + str(eventObject.id) + '/'

        # Test deleting event as not event owner fails
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_get_user_owned_events_success(self):
        # Create 2 event objects under the same user
        eventObject = self.generateNewEventObject()
        eventObject2 = self.generateNewEventObject()
        eventObject2.user = eventObject.user
        eventObject2.save()
        url = self.baseUrl + 'owned/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check if the user gets two events from the get owned events api
        self.assertEqual(2, response.json()['count'])

    def test_get_user_affiliated_events_success(self):
        # Create 2 event objects under the same user
        eventObject = self.generateNewEventObject()
        eventObject2 = self.generateNewEventObject()
        eventObject2.user = eventObject.user
        eventObject2.save()
        url = self.baseUrl + 'affiliated/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        # Create an event member object with this user being assigned to a different event
        eventObjectAnother = self.generateNewEventObject()
        EventMember.objects.create(
            userId = user.id,
            user = user,
            eventId = eventObjectAnother.id,
            event = eventObjectAnother,
            status = EventMemberStatus.get.ACCEPTED.value,
        )

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check if the user gets three events (2 owned + 1 joined)
        self.assertEqual(3, response.json()['count'])

    def test_event_owner_make_announcement_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'announce/' + str(eventObject.id) + '/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "content" : "Hello World"
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

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

    def test_create_event_comment_as_event_owner_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'comment/create/' + str(eventObject.id) + '/'

        # Authenticated user is event owner
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.userName)
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
        user = User.objects.get(username=eventObject.userName)
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
        user = User.objects.get(username=eventObject.userName)
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








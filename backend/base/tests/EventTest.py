from django.test import TestCase
from django.test import Client
from base.models import User, UserExtend, UserVote, Event, EventMember, EventComment, EventCommentLike, Friend
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
from base.tests import BaseTestClass
from base.enums import Utils

class EventTestClass(BaseTestClass):
    newUser = None
    baseUrl = '/api/event/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "testuser",
            "email": "test@email.com",
            "password": "password123*"
        }

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
        self.assertEqual(eventObject.user.username, response.json()['data']['userName'])
        self.assertEqual(eventObject.id, response.json()['data']['id'])

    def test_view_event_full_status_true_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'view/' + str(eventObject.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        eventObject.maxMember = 3
        eventObject.save()
        EventMember.objects.bulk_create([
            EventMember(eventId=eventObject.id, event=eventObject, status=EventMemberStatus.get.ACCEPTED.value),
            EventMember(eventId=eventObject.id, event=eventObject, status=EventMemberStatus.get.ACCEPTED.value),
            EventMember(eventId=eventObject.id, event=eventObject, status=EventMemberStatus.get.ACCEPTED.value)
        ])

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json()['data']['fullStatus'])
        self.assertEqual(eventObject.id, response.json()['data']['id'])

    def test_view_event_full_status_false_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'view/' + str(eventObject.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        eventObject.maxMember = 3
        eventObject.save()
        EventMember.objects.bulk_create([
            EventMember(eventId=eventObject.id, event=eventObject, status=EventMemberStatus.get.ACCEPTED.value),
            EventMember(eventId=eventObject.id, event=eventObject, status=EventMemberStatus.get.ACCEPTED.value)
        ])

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.json()['data']['fullStatus'])
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
        user = User.objects.get(username=eventObject.user.username)
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
        user = User.objects.get(username=eventObject.user.username)
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
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.generateNewEventData()
        data['maxMember'] = 1
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_update_event_title_too_long_fails(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'update/' + str(eventObject.id) + '/'

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.generateNewEventData()
        data['title'] = 'a' * Utils.get.MAX_TITLE_LENGTH.value + 1
        response = c.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_update_event_status_success(self):
        eventObject = self.generateNewEventObject()
        url = self.baseUrl + 'updateStatus/' + str(eventObject.id) + '/'
        eventStatus = EventStatus.get.CANCELLED.value

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
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
        user = User.objects.get(username=eventObject.user.username)
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
        user = User.objects.get(username=eventObject.user.username)
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
        user = User.objects.get(username=eventObject.user.username)
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
        user = User.objects.get(username=eventObject.user.username)
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
        user = User.objects.get(username=eventObject.user.username)
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

    def test_get_user_past_events_success(self):
        # Create 2 event objects under the same user
        eventObject = self.generateNewEventObject()
        eventObject2 = self.generateNewEventObject()
        eventObject2.user = eventObject.user
        
        # Set status to finished
        eventObject.status = EventStatus.get.FINISHED.value
        eventObject2.status = EventStatus.get.FINISHED.value

        eventObject.save()
        eventObject2.save()
        url = self.baseUrl + 'affiliated/?filter=status-' + str(EventStatus.get.FINISHED.value)

        # The authenticated user must be the event creator
        # Authenticate user-------------------------------------------
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        # Create an event member object with this user being assigned to a different event
        eventObjectAnother = self.generateNewEventObject()
        eventObjectAnother.status = EventStatus.get.FINISHED.value
        eventObjectAnother.save()
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
        user = User.objects.get(username=eventObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "content" : "Hello World"
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_show_trending_suggestion_for_event_creation_success(self):
        url = self.baseUrl + 'createSuggestions/1/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()['data']), 15)

    def test_invite_friend_to_event_success(self):
        eventObject = self.generateNewEventObject()
        user1 = eventObject.user
        user2 = self.generateNewUserObject()

        url = self.baseUrl + 'inviteFriend/' + str(user2.id) + '/'

        Friend.objects.create(
            user1 = user1,
            user2 = user2
        )

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "eventId": eventObject.id
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_daily_number_of_events_per_month_success(self):
        eventObject = self.generateNewEventObject()
        eventObject2 = Event.objects.create(
            year  = eventObject.year,
            month = eventObject.month,
            day  = eventObject.day
        )
        
        # user1 is the owner of eventObject
        user1 = eventObject.user
        
        # Assign user1 to a new event
        eventMemberUser1 = EventMember.objects.create(
            eventId = eventObject2.id,
            event   = eventObject2,
            userId  = user1.id,
            user    = user1,
            status  = EventMemberStatus.get.ACCEPTED.value
        )

        url = self.baseUrl + 'getMonthYear/' + str(user1.id) + '/' + str(eventObject.month) + '-' + str(eventObject.year) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # The number of event on that day should be owned + joined as member (2)
        self.assertEqual(2, response.json()['data'][eventObject.day-1])

    def test_get_user_daily_number_of_events_per_month_invalid_month_year_fails(self):
        user1 = self.generateNewUserObject()
        url = self.baseUrl + 'getMonthYear/' + str(user1.id) + '/22-2999/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_user_events_per_given_date_success(self):
        eventObject = self.generateNewEventObject()
        eventObject2 = Event.objects.create(
            year  = eventObject.year,
            month = eventObject.month,
            day   = eventObject.day,
            startDate = eventObject.startDate,
            createdAt = eventObject.createdAt,
            hour   = eventObject.hour,
            minute = eventObject.minute,
            user   = eventObject.user
        )
        
        # user1 is the owner of eventObject
        user1 = eventObject.user
        
        # Assign user1 to a new event
        eventMemberUser1 = EventMember.objects.create(
            eventId = eventObject2.id,
            event   = eventObject2,
            userId  = user1.id,
            user    = user1,
            status  = EventMemberStatus.get.ACCEPTED.value
        )

        url = self.baseUrl + 'getPerDate/' + str(user1.id) + '/' + str(eventObject.day) + '-' + str(eventObject.month) + '-' + str(eventObject.year) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # The number of event on that day should be owned + joined as member (2)
        self.assertEqual(2, len(response.json()['data']))

    def test_get_user_events_per_given_date_invalid_date_fails(self):
        eventObject = self.generateNewEventObject()
        # user1 is the owner of eventObject
        user1 = eventObject.user

        url = self.baseUrl + 'getPerDate/' + str(user1.id) + '/40-12-2023/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=user1.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_events_past_24_hours_auto_finished_on_call_all_events_success(self):
        eventObject = self.generateNewEventObject()

        eventObject.startDate = timezone.make_aware(datetime.datetime(2023, 1, 1, 1, 1))
        eventObject.status = EventStatus.get.ONGOING.value
        eventObject.save()

        url = self.baseUrl + 'all/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertTrue(Event.objects.get(id=eventObject.id).status, EventStatus.get.FINISHED.value)

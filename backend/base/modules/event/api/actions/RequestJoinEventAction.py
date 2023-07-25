from base.models import Event, EventMember
from base.serializers import EventSerializer
from base.views.baseViews import response, error
from base.traits import NotifyUser
from base.enums import EventMemberStatus, EventStatus

from datetime import datetime
from django.utils import timezone

def checkEventId(pk):
    checkEventExist = Event.objects.filter(id = pk)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def checkEventMemberStatus(eventId, userId):
    checkExist = EventMember.objects.filter(eventId = eventId, userId = userId)

    if len(checkExist) > 0:
        return checkExist[0].status

    else:
        # return -1 if no event-member record exist
        return -1
    
def checkEventFull(event):
    if len(EventMember.objects.filter(eventId = event.id, status = EventMemberStatus.get.ACCEPTED.value)) >= event.maxMember:
        return False
    return True

def checkOngoingEvent(event):
    currentTime = timezone.make_aware(datetime.now())
    if currentTime >= event.startDate:
        return True
    return False

def request(request):
    data = request.data
    user = request.user

    if not checkEventId(data['eventId']):
        return error('Event ID not found')

    event = Event.objects.get(id = data['eventId'])

    if not checkEventFull(event):
        return error('Event is full')

    if event.status != None:
        return error('Event status is FINISHED/CANCELLED')

    if user.id == event.user.id:
        return error('You cannot request to join your own event')
    
    if checkOngoingEvent(event):
        return error('Event has already started')

    checkMemberStatus = checkEventMemberStatus(data['eventId'], user.id)

    if checkMemberStatus == -1:
        # No record exist, then create a new event member record
        eventMember = EventMember.objects.create (
            userId = user.id,
            eventId = data['eventId'],
            user = user,
            event = Event.objects.get(id = data['eventId']),
            status = 0
        )

        eventCreatorUserId = event.user.id
        link = '/event/' + str(event.id)
        notificationMessage = 'User <b>' + user.username + '</b> has requested to join your event ' + '<b>' + event.title + '</b>'
        NotifyUser.notify(eventCreatorUserId, notificationMessage, link)

        return response('Your request to join this event have been submitted. Please wait for approval from the event creator')
    
    elif checkMemberStatus == 0:
        return error('You already have a pending request to join this event')
    
    elif checkMemberStatus == 1:
        return error('You are already part of this event')
    
    else:
        return error('Your request to join this event have been denied by the event creator')

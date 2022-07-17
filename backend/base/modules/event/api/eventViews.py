from tabnanny import check
from django.shortcuts import render
from django.http import JsonResponse
from base.models import *
from base.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from ....views import baseViews as base





from base.modules.event.api.validators import CreateEventValidator
from base.modules.event.api.actions import CreateEventAction

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createEvent(request):
    if (CreateEventValidator.validate(request) != None):
        return CreateEventValidator.validate(request)
    
    return CreateEventAction.create(request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewEvent(request, pk):
    if not base.checkEventId(pk):
        return base.error('Event ID not found')

    event = Event.objects.get(id=pk)
    serializer = EventSerializer(event, many=False)
    return base.response('Event retrieved', serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateEvent(request, pk):
    data = request.data

    if not base.checkEventId(pk):
        return base.error('Event ID not found')

    validator = base.eventValidator(data)

    if validator != '':
        return base.error(validator)

    event = Event.objects.get(id=pk)

    event.title = data['title']
    event.maxMember = data['maxMember']

    event.save()

    serializer = EventSerializer(event, many=False)
    return base.response('Event updated', serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteEvent(request, pk):
    data = request.data
    user = request.user

    if not base.checkEventId(pk):
        return base.error('Event ID not found')

    event = Event.objects.get(id=pk)

    if user.id != event.user.id:
        return base.error('Can only delete your own events')

    event.delete()

    return base.response('Event deleted.')

@api_view(['GET'])
def allEvent(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return base.response('All events retrieved', serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def requestJoinEvent(request):
    user = request.user
    data = request.data

    validator = base.requestJoinEventValidator(data)

    if validator != '':
        return base.error(validator)

    if not base.checkEventId(data['eventId']):
        return base.error('Event ID not found')

    event = Event.objects.get(id = data['eventId'])

    if user.id == event.user.id:
        return base.error('You cannot request to join your own event')

    checkMemberStatus = base.checkEventMemberStatus(data['eventId'], user.id)

    if checkMemberStatus == -1:
        # No record exist, then create a new event member record
        eventMember = EventMember.objects.create (
            userId = user.id,
            eventId = data['eventId'],
            user = user,
            event = Event.objects.get(id = data['eventId']),
            status = 0
        )

        print(event.user.id)
        eventCreatorUserId = event.user.id
        notificationMessage = 'User ' + user.username + ' has requested to join your event'
        base.notifyUser(eventCreatorUserId, notificationMessage)

        return base.response('Your request to join this event have been submitted. Please wait for approval from the event creator')
    elif checkMemberStatus == 0:
        return base.error('You already have a pending request to join this event')
    elif checkMemberStatus == 1:
        return base.error('You are already part of this event')
    else:
        return base.error('Your request to join this event have been denied by the event creator')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEventMembers(request, pk):
    user = request.user

    if not base.checkEventId(pk):
        return base.error('Event ID not found')

    event = Event.objects.get(id=pk)
    eventMember = EventMember.objects.filter(eventId = pk)
    serializer = EventMemberSerializer(eventMember, many=True)

    return base.response('Members of event retrieved', serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changeEventMemberStatus(request):
    user = request.user
    data = request.data
 
    validator = base.changeEventMemberStatusValidator(data)

    if validator != '':
        return base.error(validator)

    if not base.checkEventId:
        return base.error('Event ID not found')

    event = Event.objects.get(id=data['eventId'])

    if user.id != event.user.id:
        return base.error('You can only approve members as an event creator')
    
    if not base.checkUserId(data['userId']):
        return base.error('User ID not found')
    

    checkMemberStatus = base.checkEventMemberStatus(data['eventId'], data['userId'])

    if checkMemberStatus == -1:
        return base.error('No existing join request record from this user')

    if checkMemberStatus == 0 or checkMemberStatus == 2:
        # If the user have a pending request or was rejected, event creator can approve/re-approve it
        findEventMember = EventMember.objects.filter(eventId=data['eventId'], userId = data['userId'])

        eventMember = findEventMember[0]
        eventMember.status = data['status']
        eventMember.save()

        if (data['status']) == 1:
            return base.response('Request approved')
        else:
            return base.response('Request rejected')
    else:
        return base.error('This user has already been accepted into the event')

# Get events owned by auth user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ownedEvent(request):
    user = request.user

    user_events = Event.objects.filter(user = user)

    serializer = EventSerializer(user_events, many=True)
    return base.response('User owned events retrieved', serializer.data)

# Get events participated and owned by auth user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def participatedAndOwnedEvent(request):
    user = request.user

    events = Event.objects.filter(user = user)

    participated_event_datas = EventMember.objects.filter(userId = user.id)

    for event_member in participated_event_datas:
        events = events | Event.objects.filter(id = event_member.eventId)

    serializer = EventSerializer(events, many=True)
    return base.response('User owned and participated events retrieved', serializer.data)
    
    



    




    


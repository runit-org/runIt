from tabnanny import check
from django.shortcuts import render
from django.http import JsonResponse
from base.models import *
from base.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from ....views import baseViews as base





from base.modules.event.api.validators import (
    CreateEventValidator, 
    UpdateEventValidator,
    RequestJoinEventValidator,
)
from base.modules.event.api.actions import (
    CreateEventAction, 
    ViewEventAction, 
    UpdateEventAction, 
    DeleteEventAction, 
    GetAllEventAction,
    RequestJoinEventAction,
    GetEventMembersAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createEvent(request):
    if (CreateEventValidator.validate(request) != None):
        return CreateEventValidator.validate(request)
    
    return CreateEventAction.create(request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewEvent(request, pk):

    return ViewEventAction.view(request, pk)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateEvent(request, pk):
    if (UpdateEventValidator.validate(request) != None):
        return UpdateEventValidator.validate(request)

    return UpdateEventAction.update(request, pk)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteEvent(request, pk):
    return DeleteEventAction.delete(request, pk)

@api_view(['GET'])
def allEvent(request):
    return GetAllEventAction.all(request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def requestJoinEvent(request):
    if (RequestJoinEventValidator.validate(request) != None):
        return RequestJoinEventValidator.validate(request)

    return RequestJoinEventAction.request(request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEventMembers(request, pk):
    return GetEventMembersAction.getMembers(request, pk)

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
    
    



    




    


from django.shortcuts import render
from django.http import JsonResponse
from base.models import *
from base.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from . import baseViews as base

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createEvent(request):
    data = request.data

    validator = base.eventValidator(data)

    if validator != '':
        return base.error(validator)
    
    user = request.user

    event = Event.objects.create(
        user = user,
        title = data['title'],
        maxMember = data['maxMember']
    )
    
    serializer = EventSerializer(event, many=False)

    return base.response('Post created', serializer.data)

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

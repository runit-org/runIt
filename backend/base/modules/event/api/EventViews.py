from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.event.api.validators import (
    CreateEventValidator, 
    UpdateEventValidator,
    RequestJoinEventValidator,
    ChangeEventMemberStatusValidator,
    AnnounceMembersValidator,
)
from base.modules.event.api.actions import (
    CreateEventAction, 
    ViewEventAction, 
    UpdateEventAction, 
    DeleteEventAction, 
    GetAllEventAction,
    RequestJoinEventAction,
    GetEventMembersAction,
    ChangeEventMemberStatusAction,
    GetOwnedEventsAction,
    GetParticipatedAndOwnedEventsAction,
    AnnounceMembersAction,
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
    if (ChangeEventMemberStatusValidator.validate(request) != None):
        return ChangeEventMemberStatusValidator.validate(request)

    return ChangeEventMemberStatusAction.updateStatus(request)

# Get events owned by auth user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ownedEvent(request):
    return GetOwnedEventsAction.get(request)

# Get events participated (ACCEPTED) and owned by auth user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def participatedAndOwnedEvent(request):
    return GetParticipatedAndOwnedEventsAction.get(request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def announce(request, eventId):
    if (AnnounceMembersValidator.validate(request) != None):
        return AnnounceMembersValidator.validate(request)

    return AnnounceMembersAction.send(request, eventId)

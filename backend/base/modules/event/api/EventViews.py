from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.permissions import IsEmailVerified
from base.modules.event.api.validators import (
    CreateEventValidator,
    UpdateEventValidator,
    RequestJoinEventValidator,
    ChangeEventMemberStatusValidator,
    AnnounceMembersValidator,
    UpdateEventStatusValidator,
    InviteFriendToEventValidator,
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
    UpdateEventStatusAction,
    GetCreateEventSuggestionsAction,
    DeleteEventCategoryAction,
    InviteFriendToEventAction,
    GetNumEventsPerMonthAction,
    GetEventsPerFullDateAction,
)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def createEvent(request):
    if (CreateEventValidator.validate(request) != None):
        return CreateEventValidator.validate(request)

    return CreateEventAction.create(request)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewEvent(request, pk):

    return ViewEventAction.view(request, pk)


@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def updateEvent(request, pk):
    if (UpdateEventValidator.validate(request) != None):
        return UpdateEventValidator.validate(request)

    return UpdateEventAction.update(request, pk)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def updateEventStatus(request, pk):
    if (UpdateEventStatusValidator.validate(request) != None):
        return UpdateEventStatusValidator.validate(request)

    return UpdateEventStatusAction.update(request, pk)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def deleteEvent(request, pk):
    return DeleteEventAction.delete(request, pk)


@api_view(['GET'])
def allEvent(request):
    return GetAllEventAction.all(request)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def requestJoinEvent(request):
    if (RequestJoinEventValidator.validate(request) != None):
        return RequestJoinEventValidator.validate(request)

    return RequestJoinEventAction.request(request)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEventMembers(request, pk):
    return GetEventMembersAction.getMembers(request, pk)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmailVerified])
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
@permission_classes([IsAuthenticated, IsEmailVerified])
def announce(request, eventId):
    if (AnnounceMembersValidator.validate(request) != None):
        return AnnounceMembersValidator.validate(request)

    return AnnounceMembersAction.send(request, eventId)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def createEventSuggestions(request, page):
    return GetCreateEventSuggestionsAction.get(request, page)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def deleteEventCategory(request, pk):
    return DeleteEventCategoryAction.delete(request, pk)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def inviteFriendToEvent(request, userId):
    if (InviteFriendToEventValidator.validate(request) != None):
        return InviteFriendToEventValidator.validate(request)

    return InviteFriendToEventAction.send(request, userId)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNumEventsPerMonth(request, userId, monthYear):
    return GetNumEventsPerMonthAction.get(request, userId, monthYear)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEventsPerFullDate(request, userId, fullDate):
    return GetEventsPerFullDateAction.get(request, userId, fullDate)

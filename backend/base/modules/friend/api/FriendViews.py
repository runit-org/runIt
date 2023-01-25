from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.friend.api.validators import (
    RespondFriendshipRequestValidator,
)
from base.modules.friend.api.actions import (
    RequestFriendshipAction,
    RespondFriendshipRequestAction,
    ShowFriendsAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def requestFriendship(request, userId):
    return RequestFriendshipAction.request(request, userId)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def respondFriendshipRequest(request, userId):
    if (RespondFriendshipRequestValidator.validate(request) != None):
        return RespondFriendshipRequestValidator.validate(request)

    return RespondFriendshipRequestAction.respond(request, userId)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def showFriends(request):
    return ShowFriendsAction.get(request)

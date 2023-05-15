from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.user.api.validators import (
    UpdateStatusMessageValidator,
)
from base.modules.user.api.actions import (
    GetAllUserAction,
    GetUserProfileAction,
    GetCurrentUserProfileAction,
    UpdateStatusMessageAction,
)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getAllUsers(request):
    return GetAllUserAction.get(request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request, username):
    return GetUserProfileAction.get(request, username)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUserProfile(request):
    return GetCurrentUserProfileAction.get(request)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateStatusMessage(request):
    if (UpdateStatusMessageValidator.validate(request) != None):
        return UpdateStatusMessageValidator.validate(request)

    return UpdateStatusMessageAction.update(request)

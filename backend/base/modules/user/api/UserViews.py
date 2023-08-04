from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.permissions import IsEmailVerified
from base.modules.user.api.validators import (
    UpdateStatusMessageValidator,
    ChangePasswordValidator,
    UpdateDetailsValidator,
)
from base.modules.user.api.actions import (
    GetAllUserAction,
    GetUserProfileAction,
    GetCurrentUserProfileAction,
    UpdateStatusMessageAction,
    ChangePasswordAction,
    UpdateDetailsAction,
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
@permission_classes([IsAuthenticated, IsEmailVerified])
def updateStatusMessage(request):
    if (UpdateStatusMessageValidator.validate(request) != None):
        return UpdateStatusMessageValidator.validate(request)

    return UpdateStatusMessageAction.update(request)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def changePassword(request):
    if (ChangePasswordValidator.validate(request) != None):
        return ChangePasswordValidator.validate(request)

    return ChangePasswordAction.update(request)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def updateDetails(request):
    if (UpdateDetailsValidator.validate(request) != None):
        return UpdateDetailsValidator.validate(request)

    return UpdateDetailsAction.update(request)

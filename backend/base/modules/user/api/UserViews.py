from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.user.api.actions import (
    GetAllUserAction,
    GetUserProfileAction,
)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getAllUsers(request):
    return GetAllUserAction.get(request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request, username):
    return GetUserProfileAction.get(request, username)
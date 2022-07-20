from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.notification.api.actions import (
    GetCurrentUserNotificationsAction,
    ReadNotificationAction,
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
    return GetCurrentUserNotificationsAction.get(request)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def read(request, pk):
    return ReadNotificationAction.read(request, pk)

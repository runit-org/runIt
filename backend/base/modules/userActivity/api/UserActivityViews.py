from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.userActivity.api.actions import (
    GetCurrentUserActivityLogsAction,
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
    return GetCurrentUserActivityLogsAction.get(request)
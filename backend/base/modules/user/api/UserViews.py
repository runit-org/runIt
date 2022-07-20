from base.models import User
from base.serializers import UserSerializer
from rest_framework.decorators import api_view
from base.modules.user.api.actions import (
    GetAllUserAction,
)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getAllUsers(request):
    return GetAllUserAction.get(request)
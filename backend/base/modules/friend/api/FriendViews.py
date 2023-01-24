from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from base.modules.friend.api.validators import (

# )
from base.modules.friend.api.actions import (
    RequestFriendshipAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def requestFriendship(request, userId):
    return RequestFriendshipAction.request(request, userId)

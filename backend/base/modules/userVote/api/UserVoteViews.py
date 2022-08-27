from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.userVote.api.validators import (
    VoteUserValidator,
)
from base.modules.userVote.api.actions import (
    VoteUserAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote(request, userId):
    if (VoteUserValidator.validate(request) != None):
        return VoteUserValidator.validate(request)
    
    return VoteUserAction.vote(request, userId)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.permissions import IsEmailVerified
from base.modules.userVote.api.validators import (
    VoteUserValidator,
)
from base.modules.userVote.api.actions import (
    VoteUserAction,
    ListVotedUsersAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmailVerified])
def vote(request, userId):
    if (VoteUserValidator.validate(request) != None):
        return VoteUserValidator.validate(request)
    
    return VoteUserAction.vote(request, userId)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listVotedUsers(request):
    return ListVotedUsersAction.get(request)

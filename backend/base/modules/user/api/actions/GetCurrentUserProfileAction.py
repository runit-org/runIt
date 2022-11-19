from base.models import User, UserVote
from base.views.baseViews import response, error
from base.enums import UserVoteStatus
from base.serializers import UserProfileSerializer

def get(request):
    data = request.data
    user = request.user

    targetUser = user
    context = {'userId' : request.user.id}
    serializer = UserProfileSerializer(targetUser, context=context, many=False)

    return response('My profile retrieved', serializer.data)
    
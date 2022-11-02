from base.models import User, UserVote
from base.views.baseViews import response, error
from base.enums import UserVoteStatus
from base.serializers import UserProfileSerializer

def checkUsername(username):
    checkUserExist = User.objects.filter(username = username)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def get(request, username):
    data = request.data

    if not checkUsername(username):
        return error('Username not found')

    targetUser = User.objects.get(username=username)
    context = {'userId' : request.user.id}
    serializer = UserProfileSerializer(targetUser, context=context, many=False)

    return response('User profile retrieved', serializer.data)
    
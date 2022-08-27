from base.models import User, UserVote
from base.views.baseViews import response, error
from base.enums import UserVoteStatus

def checkUserId(userId):
    checkUserExist = User.objects.filter(id = userId)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def checkHaveVoted(votedUserId, voterId):
    checkUserVoteExist = UserVote.objects.filter(votedUserId = votedUserId, voterId = voterId)

    if len(checkUserVoteExist) > 0:
        return True
    else:
        return False

def vote(request, userId):
    data = request.data
    user = request.user

    if not checkUserId(userId):
        return error('User ID not found')

    targetUser = User.objects.get(id = userId)

    if checkHaveVoted(targetUser.id, user.id):
        vote = UserVote.objects.get(votedUserId = targetUser.id, voterId = user.id)

        if data['status'] == vote.status:
            vote.delete()

            return response('Vote removed')

        else:
            vote.status = data['status']
            vote.save()

            return response('Vote updated')

    else:
        vote = UserVote.objects.create(
            votedUserId = targetUser.id,
            voterId     = user.id,
            status      = data['status'],
        )

        return response('Vote created')
    
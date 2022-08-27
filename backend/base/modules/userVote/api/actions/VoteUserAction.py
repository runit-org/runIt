from base.models import User, UserVote
from base.views.baseViews import response, error
from base.enums import UserVoteStatus

def checkUserId(userId):
    checkUserExist = User.objects.filter(id = userId)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def checkHaveVoted(votedUser, voter):
    checkUserVoteExist = UserVote.objects.filter(votedUser = votedUser, voter = voter)

    if len(checkUserVoteExist) > 0:
        return True
    else:
        return False

def delete(request, userId):
    data = request.data
    user = request.user

    if not checkUserId(userId):
        return error('User ID not found')

    targetUser = User.objects.get(id = userId)

    if checkHaveVoted(targetUser, user):
        vote = UserVote.objects.get(votedUser = targetUser, voter = user)

        if data['vote'] == vote.status:
            vote.delete()

            return response('Vote removed')

        else:
            vote.vote = data['vote']
            vote.save()

            return response('Vote updated')

    else:
        vote = UserVote.objects.create(
            votedUser = targetUser,
            voter     = user,
            status    = data['status']
        )

        return response('Vote created')
    
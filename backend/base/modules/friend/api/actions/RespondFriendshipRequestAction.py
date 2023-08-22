from base.models import User, Friend, FriendRequest
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.traits import NotifyUser
from base.events.api import FriendRequestResponded

from django.db.models import Q
from datetime import datetime
from django.utils import timezone

def checkUserId(id):
    checkUserExist = User.objects.filter(id = id)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def checkAlreadyFriends(user1, user2):
    checkFriendshipExist = Friend.objects.filter(
        Q(user1=user1) | Q(user1=user2),
        Q(user2=user1) | Q(user2=user2)
        )
    
    if len(checkFriendshipExist) > 0:
        return True
    else:
        return False

def checkRequestExist(main, requester):
    checkRequestExist = FriendRequest.objects.filter(
        main = main,
        requester = requester
    )

    if len(checkRequestExist) > 0:
        return True
    else:
        return False

def respond(request, userId):
    data = request.data
    user = request.user

    if not checkUserId(userId):
        return error('User ID not found')

    if int(user.id) == int(userId):
        return error('Cannot respond friend on self')

    targetUser = User.objects.get(id=userId)

    if checkAlreadyFriends(user, targetUser):
        return error('Already friends')

    if checkRequestExist(targetUser, user):
        return error('You have requested to be their friend')

    if not checkRequestExist(user, targetUser):
        return error('This user is not requesting to be your friend')

    friendRequestObject = FriendRequest.objects.get(main=user, requester=targetUser)
    friendRequestObject.delete()

    if data['respond'] == 1:
        Friend.objects.create(user1=user, user2=targetUser)
        FriendRequestResponded.dispatch(targetUser, user)

        return response('Request accepted')
    else:
        return response('Request deleted')
    
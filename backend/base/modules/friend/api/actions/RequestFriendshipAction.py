from base.models import User, Friend, FriendRequest
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.traits import NotifyUser

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

def sendNotification(target, user):
    link = '/friend-request/'
    notificationMessage = 'You have a pending friend request from <b>' + user.username + '</b>. Click to manage your friend requests.'  
    NotifyUser.notify(
        target.id, notificationMessage, link
    )

def request(request, userId):
    data = request.data
    user = request.user

    if not checkUserId(userId):
        return error('User ID not found')

    if int(user.id) == int(userId):
        return error('Cannot request friend on self')

    targetUser = User.objects.get(id=userId)

    if checkAlreadyFriends(user, targetUser):
        return error('Already friends')

    if checkRequestExist(targetUser, user):
        return error('You have friendship request pending on this user')

    if checkRequestExist(user, targetUser):
        return error('This user has requested to be your friend')

    FriendRequest.objects.create(main=targetUser, requester=user)
    sendNotification(targetUser, user)

    return response('Request sent')

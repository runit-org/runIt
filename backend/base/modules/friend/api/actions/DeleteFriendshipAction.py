from base.models import User, Friend, FriendRequest
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.traits import NotifyUser
from base.events.api import FriendshipDeleted

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

def delete(request, userId):
    data = request.data
    user = request.user

    if not checkUserId(userId):
        return error('User ID not found')

    if int(user.id) == int(userId):
        return error('Cannot delete friend on self')

    targetUser = User.objects.get(id=userId)

    if not checkAlreadyFriends(user, targetUser):
        return error('Not friends')

    friendshipObject = Friend.objects.get(
        Q(user1=user) | Q(user1=targetUser),
        Q(user2=user) | Q(user2=targetUser)
        )

    FriendshipDeleted.dispatch(target=user, user=targetUser)
    friendshipObject.delete()

    return response('Friendship deleted')
    
from base.models import Event, User, Friend, EventMember
from base.serializers import EventSerializer
from base.views.baseViews import response, error
from django.db.models import Q
from base.traits import NotifyUser
from base.enums import EventMemberStatus


def checkAreFriends(user1, user2):
    checkFriendshipExist = Friend.objects.filter(
        Q(user1=user1) | Q(user1=user2),
        Q(user2=user1) | Q(user2=user2)
    )

    if len(checkFriendshipExist) > 0:
        return True
    else:
        return False


def checkUserId(userId):
    checkUserExist = User.objects.filter(id=userId)

    if len(checkUserExist) > 0:
        return True
    else:
        return False


def checkEventId(eventId):
    checkEventExist = Event.objects.filter(id=eventId)

    if len(checkEventExist) > 0:
        return True
    else:
        return False


def sendNotification(currUser, target, event):
    link = '/event/' + str(event.id)
    notificationMessage = 'Your friend ' + currUser.username + \
        ' has invited you to join their event <b><i>' + \
        event.title.upper() + '</i></b>. Click here to view event.'
    NotifyUser.notify(
        target.id, notificationMessage, link
    )


def checkEventMemberStatus(eventId, userId):
    checkExist = EventMember.objects.filter(eventId=eventId, userId=userId)

    if len(checkExist) > 0:
        return checkExist[0].status

    else:
        # return -1 if no event-member record exist
        return -1


def send(request, userId):
    data = request.data
    user = request.user

    if not checkUserId(userId):
        return error('User ID not found')

    if not checkEventId(data['eventId']):
        return error('Event ID not found')

    targetUser = User.objects.get(id=userId)

    if not checkAreFriends(user, targetUser):
        return error('Not friends')

    event = Event.objects.get(id=data['eventId'])

    if event.user != user:
        if checkEventMemberStatus(event.id, user.id) != EventMemberStatus.get.ACCEPTED.value:
            return error('Can only invite friends as an accepted member or owner of an event')

    sendNotification(user, targetUser, event)

    return response('Friend invited.')

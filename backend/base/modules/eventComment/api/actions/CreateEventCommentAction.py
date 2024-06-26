from base.models import Event, User, EventComment, EventMember
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.traits import NotifyUser
from base.events.api import EventCommentCreated

from datetime import datetime
from django.utils import timezone

def checkEventId(id):
    checkEventExist = Event.objects.filter(id = id)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def checkEventMemberStatus(eventId, userId):
    checkExist = EventMember.objects.filter(eventId = eventId, userId = userId)

    if len(checkExist) > 0:
        return checkExist[0].status

    else:
        # return -1 if no event-member record exist
        return -1

def mention(event, content, user):
    characters = content.split(' ')
    for i in characters:
        targetUsername = ''
        if len(i) > 1:
            if i[0] == '@':
                targetUsername = i[1:]

            # Check if user is tagging everyone
            if targetUsername == 'everyone':
                eventMembers = EventMember.objects.filter(event = event)    
                for eventMemObject in eventMembers:
                    if eventMemObject.status == EventMemberStatus.get.ACCEPTED.value:
                        link = '/event/' + str(event.id)
                        notificationMessage = 'User <b>' + user.username + '</b> mentioned you in a comment on event ' + '<b>' + event.title + '</b>. Message: <i>' + content + '</i>'
                        NotifyUser.notify(eventMemObject.userId, notificationMessage, link)

            # Check if the mentioned user exist in the database first
            if len(User.objects.filter(username = targetUsername)) > 0:
                targetUser = User.objects.get(username = targetUsername)

                checkIfTargetUserIsMember = EventMember.objects.filter(eventId = event.id, userId = targetUser.id, status = EventMemberStatus.get.ACCEPTED.value)

                # Tagging yourself wouldn't notify
                if targetUser != user:

                    # Then check if the mentioned user is an ACCEPTED member of the current event OR is the event's creator
                    if len(checkIfTargetUserIsMember) > 0 or targetUser == event.user:
                        link = '/event/' + str(event.id)
                        notificationMessage = 'User <b>' + user.username + '</b> mentioned you in a comment on event ' + '<b>' + event.title + '</b>. Message: <i>' + content + '</i>'
                        NotifyUser.notify(targetUser.id, notificationMessage, link)


def create(request, eventId):
    data = request.data
    user = request.user

    if not checkEventId(eventId):
        return error('Event ID not found')

    event = Event.objects.get(id=eventId)

    if event.status != None:
        return error('Event status is FINISHED/CANCELLED')

    if event.user != user:
        if checkEventMemberStatus(eventId, user.id) != EventMemberStatus.get.ACCEPTED.value:
            return error('Can only create comments as an accepted member of an event')
    
    eventComment = EventComment.objects.create(
        event = event,
        user = user,
        content = data['content'],

        createdAt = timezone.make_aware(datetime.now())
    )

    EventCommentCreated.dispatch(user, event)

    mention(event, data['content'], user)

    return response('Comment created', [])

    
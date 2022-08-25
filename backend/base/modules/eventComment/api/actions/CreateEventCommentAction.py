from base.models import Event, User, EventComment, EventMember
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.traits import NotifyUser

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

def create(request, eventId):
    data = request.data
    user = request.user

    if not checkEventId(eventId):
        return error('Event ID not found')

    event = Event.objects.get(id=eventId)

    if event.user != user:
        if checkEventMemberStatus(eventId, user.id) != EventMemberStatus.get.ACCEPTED.value:
            return error('Can only create comments as an accepted member of an event')
    
    eventComment = EventComment.objects.create(
        event = event,
        user = user,
        content = data['content'],
    )
    serializer = EventCommentSerializer(eventComment, many=False)

    eventCreatorUserId = event.user.id
    notificationMessage = 'User <b>' + user.username + '</b> commented on your event ' + '<b>' + event.title + '</b>'
    NotifyUser.notify(eventCreatorUserId, notificationMessage)

    return response('Comment created', serializer.data)

    
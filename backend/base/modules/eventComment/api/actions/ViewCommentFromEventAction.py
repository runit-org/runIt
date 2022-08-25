from base.models import Event, User, EventComment, EventMember
from base.serializers import AllEventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes, EventMemberStatus

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

def view(request, eventId):
    data = request.data
    user = request.user

    if not checkEventId(eventId):
        return error('Event ID not found')

    event = Event.objects.get(id=eventId)

    if event.user != user:
        if checkEventMemberStatus(eventId, user.id) != EventMemberStatus.get.ACCEPTED.value:
            return error('Can only view comments as an accepted member of an event')
    
    eventComments = EventComment.objects.filter(event=event).order_by('-createdAt')

    context = {'userId' : request.user.id}
    return paginate(request, eventComments, AllEventCommentSerializer, PaginationSizes.get.S.value, context)

    
from base.models import Event, EventMember
from base.views.baseViews import response, error
from base.events.api import EventAnnouncementSent

def checkEventId(eventId):
    checkEventExist = Event.objects.filter(id = eventId)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def send(request, eventId):
    data = request.data
    user = request.user

    if not checkEventId(eventId):
        return error('Event ID not found')

    event = Event.objects.get(id=eventId)

    if event.status != None:
        return error('Event status is FINISHED/CANCELLED')

    if user.id != event.user.id:
        return error('Can only announce on your own events')

    EventAnnouncementSent.dispatch(user, event, data['content'])

    return response('Announcement sent')
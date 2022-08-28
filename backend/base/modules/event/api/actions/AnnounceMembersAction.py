from base.models import Event, EventMember
from base.views.baseViews import response, error
from base.traits import NotifyUser

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

    if user.id != event.user.id:
        return error('Can only delete your own events')

    members = EventMember.objects.filter(event=event)

    message = '<b>' + user.username + '</b> made an announcement on event <b>' + event.title + '</b>: ' + '<i>' + data['content'] + '</i>'
    for member in members:
        NotifyUser.notify(member.id, message)

    return response('Announcement sent')
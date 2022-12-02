from base.models import Event, User, EventMember
from base.serializers import EventSerializer
from base.traits import NotifyUser
from base.views.baseViews import response, error
from base.enums import EventMemberStatus, EventStatus

def checkEventId(pk):
    checkEventExist = Event.objects.filter(id = pk)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def sendNotification(user, event, status):
    eventMemberObjects = EventMember.objects.filter(event=event)
    for eventMember in eventMemberObjects:
        if eventMember.user != user:
            if eventMember.status == EventMemberStatus.get.ACCEPTED.value:
                notificationMessage = 'User <b>' + user.username + '</b> has updated the status of an event you are affiliated with: <b>' + event.title + '</b>. New status: ' + status
                NotifyUser.notify(eventMember.user.id, notificationMessage)

def update(request, pk):
    data = request.data
    user = request.user

    if not checkEventId(pk):
        return error('Event ID not found')

    event = Event.objects.get(id=pk)

    if user.id != event.user.id:
        return error('Can only update your own event status')

    if event.status != None:
        return error('Event status has already been updated')

    event.status = data['status']
    event.save()

    sendNotification(user, event, EventStatus.get(data['status']).name)

    serializer = EventSerializer(event, many=False)

    return response('Event status updated', serializer.data)
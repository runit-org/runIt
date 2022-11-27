from base.models import Event, User
from base.serializers import EventSerializer
from base.traits import NotifyUser
from base.views.baseViews import response, error

def checkEventId(pk):
    checkEventExist = Event.objects.filter(id = pk)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

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

    serializer = EventSerializer(event, many=False)

    return response('Event status updated', serializer.data)
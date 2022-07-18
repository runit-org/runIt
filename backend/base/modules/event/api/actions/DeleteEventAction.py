from base.models import Event
from base.serializers import EventSerializer
from base.views.baseViews import response, error

def checkEventId(pk):
    checkEventExist = Event.objects.filter(id = pk)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def delete(request, pk):
    data = request.data
    user = request.user

    if not checkEventId(pk):
        return error('Event ID not found')

    event = Event.objects.get(id=pk)

    if user.id != event.user.id:
        return error('Can only delete your own events')

    event.delete()

    return response('Event deleted.')
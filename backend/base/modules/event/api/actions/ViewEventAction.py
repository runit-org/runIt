from base.models import Event
from base.serializers import EventSerializer
from base.views.baseViews import response, error

def checkEventId(id):
    checkEventExist = Event.objects.filter(id = id)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def view(request, pk):
    if not checkEventId(pk):
        return error('Event ID not found')

    event = Event.objects.get(id=pk)
    serializer = EventSerializer(event, many=False)
    return response('Event retrieved', serializer.data)
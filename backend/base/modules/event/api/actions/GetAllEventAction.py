from base.models import Event
from base.serializers import EventSerializer
from base.views.baseViews import response, error

def all(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return response('All events retrieved', serializer.data)
from base.models import Event
from base.serializers import EventSerializer
from base.views.baseViews import response, error

def get(request):
    user = request.user

    user_events = Event.objects.filter(user = user)
    serializer = EventSerializer(user_events, many=True)
    return response('User owned events retrieved', serializer.data)
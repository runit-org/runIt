from base.models import Event
from base.serializers import EventSerializer
from base.views.baseViews import response, error

def create(request):
    data = request.data
    user = request.user

    event = Event.objects.create(
        user        = user,
        title       = data['title'],
        maxMember   = data['maxMember'],
        userName    = user.username,
        details     = data['details']
    )
    serializer = EventSerializer(event, many=False)

    return response('Event created', serializer.data)
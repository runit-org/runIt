from base.models import Event, EventMember
from base.serializers import EventSerializer, EventMemberSerializer
from base.views.baseViews import response, error

def checkEventId(pk):
    checkEventExist = Event.objects.filter(id = pk)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def getMembers(request, pk):
    user = request.user

    if not checkEventId(pk):
        return error('Event ID not found')

    event = Event.objects.get(id=pk)
    eventMember = EventMember.objects.filter(eventId = pk)
    serializer = EventMemberSerializer(eventMember, many=True)

    return response('Members of event retrieved', serializer.data)
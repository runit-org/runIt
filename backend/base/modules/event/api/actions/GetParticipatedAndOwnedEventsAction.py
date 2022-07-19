from base.models import Event, EventMember
from base.serializers import EventSerializer
from base.views.baseViews import response, error
from base.enums import EventMemberStatus

def get(request):
    user = request.user

    events = Event.objects.filter(user = user)
    participated_event_datas = EventMember.objects.filter(userId = user.id, status = EventMemberStatus.EventMemberStatus.ACCEPTED.value)

    for event_member in participated_event_datas:
        events = events | Event.objects.filter(id = event_member.eventId)

    serializer = EventSerializer(events, many=True)
    return response('User owned and participated events retrieved', serializer.data)
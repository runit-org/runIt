from base.models import EventMember, Event, User
from base.enums import EventMemberStatus

def get(eventId, userId):
    member = EventMember.objects.filter(eventId=eventId, userId=userId)
    event = Event.objects.get(id = eventId)
    user = User.objects.get(id = userId)
    if event.user == user:
        return 'OWNER'

    if len(member) < 1:
        return None
    else:
        status = EventMember.objects.get(id=member[0].id).status
        return EventMemberStatus.get(status).name
    
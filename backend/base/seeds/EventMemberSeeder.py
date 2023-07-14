from base.models import EventMember, User, Event
from base.enums import EventMemberStatus

def create_seed_data():
    events = Event.objects.all()
    for event in events:
        assign_members_to_an_event(event)

    print('Event Members seeded successfully')

def assign_members_to_an_event(event):
    for i in range(1, 6):
        if i != event.user.id:
            create_individual_event_member(i, event)

def create_individual_event_member(userId, event):
    EventMember.objects.create(
        eventId = event.id,
        event = event,
        userId = userId,
        user = User.objects.get(id=userId),
        status = EventMemberStatus.get.ACCEPTED.value
    )

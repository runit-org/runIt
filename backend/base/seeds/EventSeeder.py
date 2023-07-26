from base.models import Event, User
from base.factories import EventFactory

def create_seed_data():
    # Range user_id 1 to 6
    for i in range(1, 6):
        create_events_for_one_user(i)

    print('Events seeded successfully')

def create_events_for_one_user(userId, count=2):
    for i in range(count):
        create_individual_event(userId)

def create_individual_event(userId):
    user = User.objects.get(id=userId)

    eventData = EventFactory.build().__dict__
    eventData.pop('_state', None)

    event = Event.objects.create(**eventData)
    event.user = user
    event.save()

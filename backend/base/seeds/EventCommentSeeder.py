from base.models import Event, EventComment, EventMember
from base.factories import EventCommentFactory

def create_seed_data():
    events = Event.objects.all()
    for event in events:
        create_comments_for_one_event(event)

    print('Event Comments seeded successfully')

def create_comments_for_one_event(event):
    eventMembers = EventMember.objects.filter(event=event)
    for member in eventMembers:
        create_individual_comment(event, member.user)

def create_individual_comment(event, user):
    eventCommentData = EventCommentFactory.build().__dict__
    eventCommentData.pop('_state', None)

    eventComment = EventComment.objects.create(**eventCommentData)
    eventComment.event = event
    eventComment.user = user
    eventComment.save()

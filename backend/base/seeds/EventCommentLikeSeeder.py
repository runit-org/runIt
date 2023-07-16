from base.models import EventComment, EventCommentLike

def create_seed_data():
    eventComments = EventComment.objects.all()
    for comment in eventComments:
        create_individual_comment_like(comment)

    print('Event Comment Likees seeded successfully')

def create_individual_comment_like(eventComment):
    EventCommentLike.objects.create(
        eventComment = eventComment,
        user = eventComment.user
    )

from base.models import User, EventComment, EventCommentLike, EventMember
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.traits import NotifyUser
from base.events.api import EventCommentLiked

def checkCommentId(id):
    checkCommentExist = EventComment.objects.filter(id = id)
    if len(checkCommentExist) > 0:
        return True
    else:
        return False

def checkCommentLikeExist(comment, user):
    if len(EventCommentLike.objects.filter(eventComment=comment, user=user)) > 0:
        return True
    return False

def checkEventMemberStatus(eventId, userId):
    checkExist = EventMember.objects.filter(eventId = eventId, userId = userId)

    if len(checkExist) > 0:
        return checkExist[0].status

    else:
        # return -1 if no event-member record exist
        return -1

def update(request, commentId):
    data = request.data
    user = request.user

    if not checkCommentId(commentId):
        return error('Coment not found')

    comment = EventComment.objects.get(id=commentId)
    event = comment.event

    if event.user != user:
        if checkEventMemberStatus(event.id, user.id) != EventMemberStatus.get.ACCEPTED.value:
            return error('Can only like comments as an accepted member of an event')

    if comment.event.status != None:
        return error('Event status is FINISHED/CANCELLED')

    if checkCommentLikeExist(comment, user):
        eventCommentLike = EventCommentLike.objects.get(eventComment=comment, user=user)
        eventCommentLike.delete()

        return response('Comment unliked', [])

    else:
        EventCommentLike.objects.create(
            eventComment=comment,
            user=user
        )

        if user != comment.user:
            EventCommentLiked.dispatch(user, comment)

        return response('Comment liked', [])
    
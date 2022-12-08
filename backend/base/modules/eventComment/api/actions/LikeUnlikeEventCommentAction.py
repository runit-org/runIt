from base.models import User, EventComment, EventCommentLike
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.traits import NotifyUser

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

def update(request, commentId):
    data = request.data
    user = request.user

    if not checkCommentId(commentId):
        return error('Coment not found')

    comment = EventComment.objects.get(id=commentId)

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
            link = '/event/' + str(comment.event.id)
            notifDetails = 'User <b>' + user.username + '</b> liked your comment: <i>' + comment.content + '</i>' 
            NotifyUser.notify(comment.user.id, notifDetails, link)

        return response('Comment liked', [])
    
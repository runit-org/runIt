from base.models import Event, User, EventComment, EventMember
from base.serializers import EventCommentSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus
from base.events.api import EventCommentDeleted

def checkCommentId(id):
    checkCommentExist = EventComment.objects.filter(id = id)

    if len(checkCommentExist) > 0:
        return True
    else:
        return False

def checkCommentCreator(commentId, userId):
    comment = EventComment.objects.get(id=commentId)
    user = User.objects.get(id = userId)
    if comment.user != user:
        return False
    return True

def delete(request, commentId):
    data = request.data
    user = request.user

    if not checkCommentId(commentId):
        return error('Coment not found')

    if not checkCommentCreator(commentId, user.id):
        return error('Is not comment creator')

    comment = EventComment.objects.get(id=commentId)

    if comment.event.status != None:
        return error('Event status is FINISHED/CANCELLED')

    EventCommentDeleted.dispatch(user, comment.event, comment.content)

    comment.delete()

    return response('Comment deleted', [])
    
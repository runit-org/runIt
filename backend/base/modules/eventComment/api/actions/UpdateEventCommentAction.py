from base.models import Event, User, EventComment, EventMember
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

def mention(event, content, user):
    characters = content.split(' ')
    for i in characters:
        targetUsername = ''
        if i[0] == '@':
            targetUsername = i[1:]

        # Check if user is tagging everyone
        if targetUsername == 'everyone':
            eventMembers = EventMember.objects.filter(event = event)    
            for eventMemObject in eventMembers:
                if eventMemObject.status == EventMemberStatus.get.ACCEPTED.value:
                    notificationMessage = 'User <b>' + user.username + '</b> mentioned you in a comment on event ' + '<b>' + event.title + '</b>. Message: <i>' + content + '</i>'
                    NotifyUser.notify(eventMemObject.userId, notificationMessage)

        # Check if the mentioned user exist in the database first
        if len(User.objects.filter(username = targetUsername)) > 0:
            targetUser = User.objects.get(username = targetUsername)

            checkIfTargetUserIsMember = EventMember.objects.filter(eventId = event.id, userId = targetUser.id, status = EventMemberStatus.get.ACCEPTED.value)

            # Tagging yourself wouldn't notify
            if targetUser != user:

                # Then check if the mentioned user is an ACCEPTED member of the current event OR is the event's creator
                if len(checkIfTargetUserIsMember) > 0 or targetUser == event.user:
                    notificationMessage = 'User <b>' + user.username + '</b> mentioned you in a comment on event ' + '<b>' + event.title + '</b>. Message: <i>' + content + '</i>'
                    NotifyUser.notify(targetUser.id, notificationMessage)

def checkCommentCreator(commentId, userId):
    comment = EventComment.objects.get(id=commentId)
    user = User.objects.get(id = userId)
    if comment.user != user:
        return False
    return True

def update(request, commentId):
    data = request.data
    user = request.user

    if not checkCommentId(commentId):
        return error('Coment not found')

    if not checkCommentCreator(commentId, user.id):
        return error('Is not comment creator')

    comment = EventComment.objects.get(id=commentId)
    comment.content = data['content']
    comment.save()

    serializer = EventCommentSerializer(comment, many=False)

    event = comment.event
    mention(event, data['content'], user)

    return response('Comment updated', serializer.data)
    
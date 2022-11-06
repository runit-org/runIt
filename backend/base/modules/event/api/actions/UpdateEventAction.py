from base.models import Event, User
from base.serializers import EventSerializer
from base.traits import NotifyUser
from base.views.baseViews import response, error

def checkEventId(pk):
    checkEventExist = Event.objects.filter(id = pk)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def mention(event, content, user):
    characters = content.split(' ')
    for i in characters:
        targetUsername = ''
        if i[0] == '@':
            targetUsername = i[1:]

        # Check if the mentioned user exist in the database first
        if len(User.objects.filter(username = targetUsername)) > 0:
            targetUser = User.objects.get(username = targetUsername)

            # Tagging yourself wouldn't notify
            if targetUser != user:
                notificationMessage = 'User <b>' + user.username + '</b> mentioned you on event ' + '<b>' + event.title + '</b>. Message: <i>' + content + '</i>'
                NotifyUser.notify(targetUser.id, notificationMessage)

def update(request, pk):
    data = request.data
    user = request.user

    if not checkEventId(pk):
        return error('Event ID not found')

    event = Event.objects.get(id=pk)

    if user.id != event.user.id:
        return error('Can only delete your own events')

    event.title = data['title']
    event.maxMember = data['maxMember']
    event.details = data['details']
    event.save()

    serializer = EventSerializer(event, many=False)

    mention(event, event.details, user)

    return response('Event updated', serializer.data)
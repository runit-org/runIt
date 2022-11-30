from base.models import Event, User, EventMember
from base.serializers import EventSerializer
from base.enums import EventMemberStatus
from base.traits import NotifyUser
from base.views.baseViews import response, error

from datetime import datetime

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

               
def create(request):
    data = request.data
    user = request.user

    event = Event.objects.create(
        user        = user,
        title       = data['title'],
        maxMember   = data['maxMember'],
        userName    = user.username,
        details     = data['details'],
        year        = data['year'],
        month       = data['month'],
        day         = data['day'],
        hour        = data['hour'],
        minute      = data['minute'],

        startDate   = datetime(data['year'], data['month'], data['day'], data['hour'], data['minute'])
    )
    # serializer = EventSerializer(event, many=False)

    mention(event, event.details, user)

    return response('Event created', [])
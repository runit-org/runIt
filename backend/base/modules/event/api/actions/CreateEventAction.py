from base.models import Event, User, EventCategory
from base.serializers import EventSerializer
from base.enums import EventMemberStatus
from base.traits import NotifyUser
from base.views.baseViews import response, error
from django.utils import timezone
from base.events.api import EventCreated

from datetime import datetime

def mention(event, content, user):
    characters = content.split(' ')
    for i in characters:
        targetUsername = ''
        if len(i) > 1:
            if i[0] == '@':
                targetUsername = i[1:]

            # Check if the mentioned user exist in the database first
            if len(User.objects.filter(username = targetUsername)) > 0:
                targetUser = User.objects.get(username = targetUsername)

                # Tagging yourself wouldn't notify
                if targetUser != user:
                    link = '/event/' + str(event.id)
                    notificationMessage = 'User <b>' + user.username + '</b> mentioned you on event ' + '<b>' + event.title + '</b>. Message: <i>' + content + '</i>'
                    NotifyUser.notify(targetUser.id, notificationMessage, link)

def validateTag(tag):
    if len(tag) > 30:
        return False
    return True

def getTagsFromDetails(details):
    details = details.lower()
    tagsArray = []
    if '#' in details:
        characters = details.split('#')
        characters.pop(0)
        for char in characters:
            if len(char) < 1:
                continue
            if char.isspace():
                continue
            if char[0] == ' ':
                continue
            if ' ' not in char:
                if char not in tagsArray:
                    if validateTag(char):
                        tagsArray.append(char)
                        continue

            charWithSpaces = char.split(' ')
            if charWithSpaces[0] not in tagsArray:
                if validateTag(charWithSpaces[0]):
                    tagsArray.append(charWithSpaces[0])
    
    return tagsArray

def processTags(event, details):
    tagsArray = getTagsFromDetails(details)
    for tag in tagsArray:
        EventCategory.objects.create(
            event = event,
            tag = tag,
        )
    
def create(request):
    data = request.data
    user = request.user

    event = Event.objects.create(
        user        = user,
        title       = data['title'],
        maxMember   = data['maxMember'],
        details     = data['details'],
        year        = data['year'],
        month       = data['month'],
        day         = data['day'],
        hour        = data['hour'],
        minute      = data['minute'],

        startDate   = timezone.make_aware(datetime(data['year'], data['month'], data['day'], data['hour'], data['minute'])),
        createdAt   = timezone.make_aware(datetime.now())
    )
    processTags(event, data['details'])

    mention(event, event.details, user)
    EventCreated.dispatch(event = event)

    context = {'userId' : request.user.id}
    serializer = EventSerializer(event, context=context, many=False)

    return response('Event created', serializer.data)
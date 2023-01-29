from base.models import Event, User, EventCategory
from base.serializers import EventSerializer
from base.enums import EventMemberStatus
from base.traits import NotifyUser
from base.views.baseViews import response, error
from django.utils import timezone

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

def checkEventTagExist(event, tag):
    checkTagExist = EventCategory.objects.filter(event=event, tag=tag)

    if len(checkTagExist) > 0:
        return True
    else:
        return False

def validateTag(tag):
    if len(tag) > 30:
        return False
    return True

def processTags(event, tags):
    tagsStripped = tags.strip()
    tagsArray = tagsStripped.split('#')

    for tag in tagsArray[1:]:
        if len(tag) > 0:
            tagStripped = tag.strip()
            tagLower = tagStripped.lower()

            if not checkEventTagExist(event, tagLower):
                if validateTag(tagLower):
                    EventCategory.objects.create(
                        event = event,
                        tag = tagLower,
                    )

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

        startDate   = timezone.make_aware(datetime(data['year'], data['month'], data['day'], data['hour'], data['minute'])),
        createdAt   = timezone.make_aware(datetime.now())
    )
    processTags(event, data['tags'])

    mention(event, event.details, user)

    return response('Event created', [])
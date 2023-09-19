from base.models import Event, User, EventCategory
from base.serializers import EventSerializer
from base.traits import NotifyUser
from base.views.baseViews import response, error
from base.events.api import EventUpdated

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

def getRemovedTags(oldTags, newTags):
    return set(oldTags) - set(newTags)

def getNewTags(oldTags, newTags):
    return set(newTags) - set(oldTags)

def processTags(event, oldDetails, newDetails):
    oldTags = getTagsFromDetails(oldDetails)
    newTags = getTagsFromDetails(newDetails)

    removedTags = getRemovedTags(oldTags, newTags)
    for rem in removedTags:
        eventCategoryFound = EventCategory.objects.get(event=event, tag=rem)
        eventCategoryFound.delete()
    
    newTags = getNewTags(oldTags, newTags)
    for new in newTags:
        EventCategory.objects.create(
            event=event,
            tag = new
        )

def update(request, pk):
    data = request.data
    user = request.user

    if not checkEventId(pk):
        return error('Event ID not found')

    event = Event.objects.get(id=pk)

    if event.status != None:
        return error('Event status is FINISHED/CANCELLED')

    if user.id != event.user.id:
        return error('Can only delete your own events')
    
    oldDetails = event.details

    event.title = data['title']
    event.maxMember = data['maxMember']
    event.details = data['details']
    event.save()

    processTags(event, oldDetails, data['details'])

    serializer = EventSerializer(event, many=False)

    mention(event, event.details, user)

    EventUpdated.dispatch(event = event)

    return response('Event updated', serializer.data)
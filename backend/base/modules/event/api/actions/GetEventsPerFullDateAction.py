from base.models import Event, User, EventMember
from base.serializers import EventSerializer, AffiliatedEventSerializer
from base.views.baseViews import response, error
from base.enums import EventMemberStatus

def checkUserId(userId):
    checkUserExist = User.objects.filter(id = userId)

    if len(checkUserExist) > 0:
        return True
    else:
        return False
    
def checkFullDateFormat(fullDate):
    if '-' not in fullDate:
        return False

    split = fullDate.split('-')
    
    if len(split) != 3:
        return False
    
    if not split[0].isnumeric() or not split[1].isnumeric() or not split[2].isnumeric():
        return False
    
    if int(split[1]) > 31 or int(split[1]) < 1:
        return False
    
    if int(split[1]) > 12 or int(split[1]) < 1:
        return False
    
    if int(split[2]) > 2100 or int(split[2]) < 1999:
        return False
    
    return True

def get(request, userId, fullDate):
    if not checkUserId(userId):
        return error('User ID does not exist')
    
    if not checkFullDateFormat(fullDate):
        return error('Invalid date')
    
    user  = User.objects.get(id=userId)
    split = fullDate.split('-')
     
    createdEvents = Event.objects.filter(user=user, day=split[0], month=split[1], year=split[2])
    eventsJoined = EventMember.objects.filter(user=user, status=EventMemberStatus.get.ACCEPTED.value, event__day=split[0], event__month=split[1], event__year=split[2])

    for joined in eventsJoined:
        createdEvents = createdEvents | Event.objects.filter(id=joined.eventId)

    serializedEvents = AffiliatedEventSerializer(createdEvents, many=True)

    return response('Retrieved affiliated events per date', serializedEvents.data)

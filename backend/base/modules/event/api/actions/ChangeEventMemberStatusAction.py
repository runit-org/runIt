from base.models import Event, User, EventMember
from base.serializers import EventSerializer
from base.views.baseViews import response, error
from base.enums import EventMemberStatus
from base.traits import NotifyUser

def checkEventId(id):
    checkEventExist = Event.objects.filter(id = id)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def checkUserId(id):
    checkUserExist = User.objects.filter(id = id)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def checkEventMemberStatus(eventId, userId):
    checkExist = EventMember.objects.filter(eventId = eventId, userId = userId)

    if len(checkExist) > 0:
        return checkExist[0].status

    else:
        # return -1 if no event-member record exist
        return -1
    
def checkEventFull(event):
    if len(EventMember.objects.filter(eventId = event.id, status = EventMemberStatus.get.ACCEPTED.value)) >= event.maxMember:
        return False
    return True

def updateStatus(request):
    data = request.data
    user = request.user

    if not checkEventId(data['eventId']):
        return error('Event ID not found')

    event = Event.objects.get(id=data['eventId'])

    if data['status'] == EventMemberStatus.get.ACCEPTED.value and not checkEventFull(event):
        return error('Event is full')

    if event.status != None:
        return error('Event status is FINISHED/CANCELLED')

    if user.id != event.user.id:
        return error('Not event owner')
    
    if not checkUserId(data['userId']):
        return error('User ID not found')
    
    checkMemberStatus = checkEventMemberStatus(data['eventId'], data['userId'])

    if checkMemberStatus == -1:
        return error('No existing join request record from this user')

    if checkMemberStatus == EventMemberStatus.get.PENDING.value or checkMemberStatus == EventMemberStatus.get.REJECTED.value:
        # If the user have a pending request or was rejected, event creator can approve/re-approve it
        findEventMember = EventMember.objects.filter(eventId=data['eventId'], userId = data['userId'])

        eventMember = findEventMember[0]
        eventMember.status = data['status']
        eventMember.save()

        link = '/event/' + str(event.id)
        if (data['status']) == EventMemberStatus.get.ACCEPTED.value:
            notifContent = 'Your request to join event <b>' + event.title + '</b> has been ' + EventMemberStatus.get.ACCEPTED.name
            NotifyUser.notify(data['userId'], notifContent, link)
            return response('Request approved')

        else:
            notifContent = 'Your request to join event <b>' + event.title + '</b> has been ' + EventMemberStatus.get.REJECTED.name
            NotifyUser.notify(data['userId'], notifContent, link)
            return response('Request rejected')
    else:
        return error('This user has already been accepted into the event')
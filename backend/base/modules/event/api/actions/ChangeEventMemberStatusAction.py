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

def updateStatus(request):
    data = request.data
    user = request.user

    if not checkEventId:
        return error('Event ID not found')

    event = Event.objects.get(id=data['eventId'])

    if user.id != event.user.id:
        return error('Not event owner')
    
    if not checkUserId(data['userId']):
        return error('User ID not found')
    

    checkMemberStatus = checkEventMemberStatus(data['eventId'], data['userId'])

    if checkMemberStatus == -1:
        return error('No existing join request record from this user')

    if checkMemberStatus == EventMemberStatus.EventMemberStatus.PENDING.value or checkMemberStatus == EventMemberStatus.EventMemberStatus.REJECTED.value:
        # If the user have a pending request or was rejected, event creator can approve/re-approve it
        findEventMember = EventMember.objects.filter(eventId=data['eventId'], userId = data['userId'])

        eventMember = findEventMember[0]
        eventMember.status = data['status']
        eventMember.save()

        if (data['status']) == EventMemberStatus.EventMemberStatus.ACCEPTED.value:
            notifContent = 'Your request to join event [' + event.title + '] has been ' + EventMemberStatus.EventMemberStatus.ACCEPTED.name
            NotifyUser.notify(data['userId'], notifContent)
            return response('Request approved')

        else:
            notifContent = 'Your request to join event [' + event.title + '] has been ' + EventMemberStatus.EventMemberStatus.REJECTED.name
            NotifyUser.notify(data['userId'], notifContent)
            return response('Request rejected')
    else:
        return error('This user has already been accepted into the event')
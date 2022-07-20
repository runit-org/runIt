from rest_framework.response import Response
from rest_framework import status
from base.models import *
import datetime
from django.utils.timezone import utc



def response(message, data=None):
    retVal = {'success' : 'true', 'message': message, 'data' : data}
    return Response(retVal)

def error(message):
    retVal = {'success' : 'false', 'message' : message}
    return Response(retVal, status = status.HTTP_400_BAD_REQUEST)

def validationError(message='Required fields not met'):
    retVal = {'success' : 'false', 'message' : message}
    return Response(retVal, status = status.HTTP_422_UNPROCESSABLE_ENTITY)

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

def eventValidator(data):
    if data.get('title') == None or data.get('maxMember') == None or data.get('details') == None:
        return 'Required fields not met'

    elif str(data['title']) == '' or str(data['title']).isspace() == True:
        return 'Title cannot be empty'

    elif  isinstance(data['maxMember'], int) == False:
        return 'Max member must be integer'
    
    elif data['maxMember'] < 2:
        return 'Max member must be more than 1'

    else:
        return ''

def requestJoinEventValidator(data):
    if data.get('eventId') == None:
        return 'Please provide an event ID'

    else:
        return ''

def changeEventMemberStatusValidator(data):
    if data.get('eventId') == None:
        return 'Please provide an eventId'

    elif data.get('userId') == None:
        return 'Please provide a user ID'

    elif data.get('status') == None:
        return 'Please provide a status'

    elif data['status'] != 1 and data['status'] != 2:
        return 'Invalid status code (1=accept, 2=reject)'

    else:
        return ''

def checkEventMemberStatus(eventId, userId):
    checkExist = EventMember.objects.filter(eventId = eventId, userId = userId)

    if len(checkExist) > 0:
        return checkExist[0].status

    else:
        # return -1 if no event-member record exist
        return -1
    
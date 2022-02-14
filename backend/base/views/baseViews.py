from rest_framework.response import Response
from rest_framework import status
from base.models import *


def response(message, data=None):
    retVal = {'success' : 'true', 'message': message, 'data' : data}
    return Response(retVal)

def error(message):
    retVal = {'success' : 'false', 'message' : message}
    return Response(retVal, status = status.HTTP_400_BAD_REQUEST)

def checkEventId(id):
    checkEventExist = Event.objects.filter(id = id)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def eventValidator(data):
    if data.get('title') == None or data.get('maxMember') == None or data.get('details') == None:
        return 'Required fields not met'

    elif str(data['title']) == '' or str(data['title']).isspace() == True:
        return 'Title cannot be empty'

    elif  isinstance(data['maxMember'], int) == False or data['maxMember'] < 2:
        return 'Max member must be more than 1'

    else:
        return ''
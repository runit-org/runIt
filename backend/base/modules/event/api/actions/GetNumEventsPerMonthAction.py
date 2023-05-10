from base.models import Event, User, EventMember
from base.serializers import EventSerializer
from base.views.baseViews import response, error
from base.enums import EventMemberStatus

def checkUserId(userId):
    checkUserExist = User.objects.filter(id = userId)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def checkMonthYearFormat(monthYear):
    if "-" not in monthYear:
        return False
    
    split = monthYear.split("-")

    if split[0] == None or split[1] == None:
        return False
    
    if not split[0].isnumeric() or not split[1].isnumeric():
        return False
    
    if int(split[0]) > 12 or int(split[0]) < 1:
        return False
    
    if int(split[1]) > 2100 or int(split[1]) < 1999:
        return False
    
    return True
    
def getMonthlyNumEventsPerDate(userId, month, year, length):
    user = User.objects.get(id=userId)
    monthArray = []
    for i in range (1, length):
        totalEvents = 0

        # 1. Count owned events
        eventsOwned = Event.objects.filter(user=user, day=i, month=month, year=year)
        totalEvents += len(eventsOwned)

        # 2. Count joined as an accepted member events
        eventsJoined = EventMember.objects.filter(user=user, status=EventMemberStatus.get.ACCEPTED.value, event__day=i, event__month=month, event__year=year)
        totalEvents += len(eventsJoined)

        monthArray.append(totalEvents)

    return monthArray

def get(request, userId, monthYear):
    if not checkMonthYearFormat(monthYear):
        return error('Invalid month-year format')
    
    if not checkUserId(userId):
        return error('User ID does not exist')
    
    split = monthYear.split("-")
    month = split[0]
    year  = split[1]
    
    oddMonths = [1, 3, 5, 7, 8, 10, 12]
    evenMonths = [4, 6, 9, 11]

    lengthDays = 28

    if month in oddMonths:
        lengthDays = 31
    elif month in evenMonths:
        lengthDays = 30
        
    eventsArray = getMonthlyNumEventsPerDate(userId, month, year, lengthDays)

    return response('Monthly number of events fetched', eventsArray)

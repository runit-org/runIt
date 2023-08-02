from asyncio import events
from base.models import Event, EventMember
from base.serializers import EventSerializer, AffiliatedEventSerializer
from base.views.baseViews import response, error, paginate
from base.enums import EventMemberStatus, PaginationSizes

def validateFilter(filterField):
    allowedFilters = ['title', 'maxMember', 'createdAt', 'status']
    if filterField not in allowedFilters:
        return False
    return True

def filter(request):
    # How to filter: filter=userName-test

    user = request.user

    filterField = ''
    filterValue = ''
    if request.GET.get('filter') != None:
        filterString = request.GET.get('filter', '')
        filterField  = filterString.split('-')[0]
        filterValue  = filterString.split('-')[1]

        if not validateFilter(filterField):
            return 'Targeted filter field not found'
    
    participatedEventDatas = EventMember.objects.filter(userId = user.id, status = EventMemberStatus.get.ACCEPTED.value)

    if filterField != '':
        affiliatedEventsFiltered = Event.objects.none()

        filterFieldContains = filterField + '__icontains'
        eventsFiltered = Event.objects.filter(**{filterFieldContains: filterValue})
        for eachEvent in eventsFiltered:
            if (eachEvent in participatedEventDatas) or (eachEvent.user == user):
                affiliatedEventsFiltered = affiliatedEventsFiltered | Event.objects.filter(id = eachEvent.id)

        return affiliatedEventsFiltered

    else:
        ownedEvents = Event.objects.filter(user = user)
        for eachEvent in participatedEventDatas:
            ownedEvents = ownedEvents | Event.objects.filter(id = eachEvent.eventId)

        return ownedEvents

def get(request):
    events = filter(request)
    if type(events) == str:
        return error(events)
    
    return paginate(request, events, AffiliatedEventSerializer, PaginationSizes.get.S.value)
    
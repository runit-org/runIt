from base.models import Event, EventMember
from base.serializers import EventSerializer
from base.views.baseViews import response, error
from base.enums import EventMemberStatus

def validateFilter(filterField):
    allowedFilters = ['title', 'userName', 'maxMember']
    if filterField not in allowedFilters:
        return False
    return True

def filterOrSort(request):
    # How to filter: filter=userName-test

    filterField = ''
    filterValue = ''
    if request.GET.get('filter') != None:
        filterString = request.GET.get('filter', '')
        filterField  = filterString.split('-')[0]
        filterValue  = filterString.split('-')[1]

        if not validateFilter(filterField):
            return 'Targeted filter field not found'

    if filterField != '' and sortField != '':
        filterFieldContains = filterField + '__icontains'
        return Event.objects.filter(**{filterFieldContains: filterValue}).order_by(sortField)
    elif filterField != '':
        filterFieldContains = filterField + '__icontains'
        return Event.objects.filter(**{filterFieldContains: filterValue})
    elif sortField != '':
        return Event.objects.all().order_by(sortField)
    else:
        return Event.objects.all()

def get(request):
    user = request.user

    events = Event.objects.filter(user = user)
    participated_event_datas = EventMember.objects.filter(userId = user.id, status = EventMemberStatus.get.ACCEPTED.value)

    for event_member in participated_event_datas:
        events = events | Event.objects.filter(id = event_member.eventId)

    serializer = EventSerializer(events, many=True)
    return response('User owned and participated events retrieved', serializer.data)
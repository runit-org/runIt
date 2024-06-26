from base.models import Event
from base.serializers import AllEventSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes
from base.tasks import update_past_24_hour_event_status_to_finished

def validateFilter(filterField):
    allowedFilters = ['title', 'userName', 'maxMember', 'createdAt']
    if filterField not in allowedFilters:
        return False
    return True

def filter(request):
    # How to filter: filter=userName-test

    filterField = ''
    filterValue = ''
    if request.GET.get('filter') != None:
        filterString = request.GET.get('filter', '')
        filterField  = filterString.split('-')[0]
        filterValue  = filterString.split('-')[1]

        if not validateFilter(filterField):
            return 'Targeted filter field not found'

    if filterField != '':
        filterFieldContains = filterField + '__icontains'
        return Event.objects.filter(**{filterFieldContains: filterValue}).order_by('-createdAt')
    else:
        return Event.objects.order_by('-createdAt')

def all(request):
    events = filter(request)
    if type(events) == str:
        return error(events)
    context = {'userId' : request.user.id}
    update_past_24_hour_event_status_to_finished()
    return paginate(request, events, AllEventSerializer, PaginationSizes.get.S.value, context)
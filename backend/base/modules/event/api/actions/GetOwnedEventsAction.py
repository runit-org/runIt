from base.models import Event
from base.serializers import EventSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes

def validateFilter(filterField):
    allowedFilters = ['title', 'maxMember']
    if filterField not in allowedFilters:
        return False
    return True

def validateSort(sortField):
    allowedSorts = ['createdAt', 'maxMember']
    if sortField not in allowedSorts:
        return False
    return True

def filterOrSort(request):
    # How to filter: filter=title-test
    # How to sort: sort=createdAt

    user = request.user

    filterField = ''
    filterValue = ''
    if request.GET.get('filter') != None:
        filterString = request.GET.get('filter', '')
        filterField  = filterString.split('-')[0]
        filterValue  = filterString.split('-')[1]

        if not validateFilter(filterField):
            return 'Targeted filter field not found'

    sortField = ''
    if request.GET.get('sort') != None:
        sortField = request.GET.get('sort', '')
        
        if not validateSort(sortField):
            return 'Targeted sort field not found'

    if filterField != '' and sortField != '':
        filterFieldContains = filterField + '__icontains'
        return Event.objects.filter(**{filterFieldContains: filterValue}, user = user).order_by(sortField)
    elif filterField != '':
        filterFieldContains = filterField + '__icontains'
        return Event.objects.filter(**{filterFieldContains: filterValue}, user = user)
    elif sortField != '':
        return Event.objects.filter(user = user).order_by(sortField)
    else:
        return Event.objects.filter(user = user)

def get(request):
    events = filterOrSort(request)
    if type(events) == str:
        return error(events)
    
    return paginate(request, events, EventSerializer, PaginationSizes.get.S.value)
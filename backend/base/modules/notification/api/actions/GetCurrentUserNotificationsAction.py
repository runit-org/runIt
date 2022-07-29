from base.models import Notification
from base.serializers import NotificationSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes, NotificationStatus

def validateFilter(filterField):
    allowedFilters = ['status']
    if filterField not in allowedFilters:
        return False
    return True

def validateStatus(status):
    if status not in NotificationStatus.get.__members__:
        return False
    return True

def filter(request):
    # Filter: /?filter=status-UNREAD

    user = request.user

    filterField = ''
    filterValue = ''
    if request.GET.get('filter') != None:
        filterString = request.GET.get('filter', '')
        filterField  = filterString.split('-')[0]
        filterValue  = filterString.split('-')[1]

        if not validateStatus(filterValue):
            return 'Status invalid'

        enumValue    = NotificationStatus.get[filterValue].value

        if not validateFilter(filterField):
            return 'Targeted filter field not found'

    if filterField != '':
        filterFieldContains = filterField + '__icontains'
        return Notification.objects.filter(**{filterFieldContains: enumValue}, userId = user.id)
    else:
        return Notification.objects.filter(userId = user.id)

def get(request):
    notifications = filter(request)
    if type(notifications) == str:
        return error(notifications)
    
    return paginate(request, notifications, NotificationSerializer, PaginationSizes.get.S.value)
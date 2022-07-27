from wsgiref import validate
from base.models import User
from base.serializers import UserSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes

def validateFilter(filterField):
    allowedFilters = ['username', 'email']
    if filterField not in allowedFilters:
        return False
    return True

def validateSort(sortField):
    allowedSorts = ['id', 'date_joined', 'username', 'email']
    if sortField not in allowedSorts:
        return False
    return True

def filterOrSort(request):
    # The only way to do filter+sort is to .filter().order_by()
    # Order_by wil always come after User.objects, User.objects.order_by(), or filter, like User.objects.filter().order_by
    # How to filter: filter=username-test
    # How to sort: sort=date_joined

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
        return User.objects.filter(**{filterFieldContains: filterValue}).order_by(sortField)
    elif filterField != '':
        filterFieldContains = filterField + '__icontains'
        return User.objects.filter(**{filterFieldContains: filterValue})
    elif sortField != '':
        return User.objects.all().order_by(sortField)
    else:
        return User.objects.all()

def get(request):
    users = filterOrSort(request)
    if type(users) == str:
        return error(users)
    
    return paginate(request, users, UserSerializer, PaginationSizes.get.S.value)
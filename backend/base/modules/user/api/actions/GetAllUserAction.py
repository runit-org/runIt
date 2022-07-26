from base.models import User
from base.serializers import UserSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes

def filterOrSort(request):
    # the only way to do filter+sort is to .filter().sort()
    # sort wil always come after User.objects, User.objects.sort()
    filtered = 0
    users = User.objects.none()
    if request.GET.get('username') != None:
        username = request.GET.get('username')
        users = User.objects.filter(username__contains=username)
        filtered = 1

    sort = request.GET.get('sort')
    if filtered == 0:
        users = User.objects.order_by('')

    return users

def get(request):
    users = filterOrSort(request)
    
    return paginate(request, users, UserSerializer, PaginationSizes.get.S.value)
from base.models import User
from base.serializers import UserSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes

def get(request):
    users = User.objects.all().order_by('id')
    
    return paginate(request, users, UserSerializer, PaginationSizes.get.S.value)
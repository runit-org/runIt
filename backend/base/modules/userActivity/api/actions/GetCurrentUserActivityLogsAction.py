from base.models import UserActivity
from base.serializers import UserActivitySerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes

def get(request):
    user = request.user

    activities = UserActivity.objects.filter(userId = user.id).order_by('-createdAt')
    
    return paginate(request, activities, UserActivitySerializer, PaginationSizes.get.S.value)

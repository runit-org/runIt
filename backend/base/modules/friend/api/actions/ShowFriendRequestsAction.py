from base.models import User, Friend, FriendRequest
from base.serializers import FriendRequestsSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes
from base.traits import NotifyUser

from django.db.models import Q

def get(request):
    data = request.data
    user = request.user

    friendRequests = FriendRequest.objects.filter(main=user).order_by('-createdAt')

    return paginate(request, friendRequests, FriendRequestsSerializer, PaginationSizes.get.S.value)

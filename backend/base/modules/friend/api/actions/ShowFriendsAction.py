from base.models import User, Friend, FriendRequest
from base.serializers import UserSerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes
from base.traits import NotifyUser

from django.db.models import Q

def validateFilter(filterField):
    allowedFilters = ['username']
    if filterField not in allowedFilters:
        return False
    return True

def getUserIdFromFriendsObject(friendsObjectArray, currentUser):
    userIdArray = []
    for friendObject in friendsObjectArray:
        if (friendObject.user1.id != currentUser.id):
            userIdArray.append(friendObject.user1.id)
        else:
            userIdArray.append(friendObject.user2.id)

    return userIdArray

def filter(request, friendIds):
    # How to filter: filter=username-test

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
        return User.objects.filter(**{filterFieldContains: filterValue}, id__in=friendIds)
    else:
        return User.objects.filter(id__in=friendIds)

def get(request):
    data = request.data
    user = request.user

    friendsObjectArray = Friend.objects.filter(
        Q(user1=user) | Q(user2=user),
        )

    friendIds = getUserIdFromFriendsObject(friendsObjectArray, user)
    users = filter(request, friendIds)
    if type(users) == str:
        return error(users)

    return paginate(request, users, UserSerializer, PaginationSizes.get.S.value)

    

    
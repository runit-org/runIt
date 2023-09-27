from base.models import UserActivity, User
from base.serializers import UserActivitySerializer
from base.views.baseViews import response, error, paginate
from base.enums import PaginationSizes, ActivityLogVisibilityTypes

def checkUsername(username):
    checkUserExist = User.objects.filter(username = username)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def get(request, username):
    user = request.user

    if not checkUsername(username):
        return error('Username not found')

    findUser = User.objects.get(username=username)
    if user.username == username:
        activities = UserActivity.objects.filter(userId = findUser.id).order_by('-createdAt')
    else:
        activities = UserActivity.objects.filter(userId = findUser.id).exclude(type__in=ActivityLogVisibilityTypes.get.PRIVATE.value).order_by('-createdAt')
    
    return paginate(request, activities, UserActivitySerializer, PaginationSizes.get.S.value)

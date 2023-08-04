from base.models import User, UserExtend
from base.views.baseViews import response, error

def update(request):
    data = request.data
    user = request.user

    userExtend = UserExtend.objects.get(userId=user.id)
    userExtend.statusMessage = data['message']
    userExtend.save()

    return response('Status messaged updated')
    
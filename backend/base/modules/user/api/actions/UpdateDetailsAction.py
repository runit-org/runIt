from base.models import User, UserExtend
from base.views.baseViews import response, error
from base.events.api import UserDetailsUpdated

def update(request):
    data = request.data
    user = request.user

    if data['username'] != user.username and len(User.objects.filter(username = data['username'])) > 0:
        return error('Username taken')

    user = User.objects.get(id=user.id)
    user.username = data['username']
    user.save()
    
    UserDetailsUpdated.dispatch(user)

    return response('User details updated')
    
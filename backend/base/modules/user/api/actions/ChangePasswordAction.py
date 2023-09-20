from base.models import User, UserExtend
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password, check_password
from base.events.api import PasswordChanged

def update(request):
    data = request.data
    user = request.user

    if not check_password(data['current_password'], user.password):
        return error('Wrong current password')

    user.password = make_password(data['password'])
    user.save()

    PasswordChanged.dispatch(user)

    return response('Password changed successfully')
    
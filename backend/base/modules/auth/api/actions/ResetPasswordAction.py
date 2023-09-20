from contextlib import nullcontext
from base.models import User, UserExtend
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer
from base.events.api import PasswordReset

import string
import random
from datetime import datetime, timezone

def reset(request):
    data = request.data

    if 'Z' not in data['token']:
        return error('Invalid token')

    tokenString = data['token'].split('Z')
    userId = tokenString[0]
    token = tokenString[1]

    if not userId.isdigit():
        return error('Invalid token') 

    if len(User.objects.filter(id = userId)) < 1:
        return error('Invalid token')

    if len(UserExtend.objects.filter(userId = userId)) < 1:
        return error('Invalid token')

    user = User.objects.get(id = userId)
    userExtend = UserExtend.objects.get(userId = user.id)

    if userExtend.resetToken != data['token']:
        return error('Invalid token')

    timeNow = datetime.now(timezone.utc)
    timeTokenWasCreated = userExtend.resetTokenTime
    timeDifference = (timeNow - timeTokenWasCreated).seconds

    if timeDifference > 60:
        return error('Token expired')

    user.password = make_password(data['password'])
    user.save()

    userExtend.resetToken = ''
    userExtend.resetTokenTime = None
    userExtend.save()

    PasswordReset.dispatch(user)

    return response('Password changed successfully')
    


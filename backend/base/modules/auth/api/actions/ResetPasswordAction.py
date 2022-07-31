from contextlib import nullcontext
from base.models import User, UserExtend
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer

import string
import random
from datetime import datetime, timezone

def reset(request):
    data = request.data

    if '|' not in data['token']:
        return error('Invalid token')

    tokenString = data['token'].split('|')
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
    print('5')
    timeNow = datetime.now(timezone.utc)
    timeTokenWasCreated = userExtend.resetTokenTime
    timeDifference = (timeNow - timeTokenWasCreated).seconds
    print(timeDifference)
    if timeDifference > 60:
        return error('Token expired')

    user.password = make_password(data['password'])
    user.save()

    userExtend.resetToken = ''
    userExtend.resetTokenTime = None
    userExtend.save()

    return response('Password changed successfully')
    


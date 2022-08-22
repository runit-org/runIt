from base.models import User, UserExtend
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer
from base.mail.AuthMail import resetPasswordEmailSent
from base.enums import URLs

import string
import random
from datetime import datetime, timezone

def generateToken(userId, size=10):
    randomString = (string.ascii_lowercase + string.digits)
    token = ''
    for i in range(0, size): 
        token += random.choice(randomString)
    
    return str(userId) + '%' + token

def send(request):
    data = request.data
    if len(User.objects.filter(email = data['email'])) < 1:
        return response('Reset password has been sent if email is available on our system')
    
    user                      = User.objects.get(email = data['email'])
    token                     = generateToken(user.id)
    resetTokenUrl             = URLs.get.FRONTEND_URL.value + '/reset-password/' + token
    userExtend                = UserExtend.objects.get(userId = user.id)
    userExtend.resetToken     = token
    userExtend.resetTokenTime = datetime.now(timezone.utc)
    userExtend.save()

    resetPasswordEmailSent(
        resetTokenUrl,
        user.email
    )

    print(token)

    return response('Reset password has been sent if email is available on our system')


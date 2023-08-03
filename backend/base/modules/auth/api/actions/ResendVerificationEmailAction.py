from base.models import EmailVerify, UserExtend
from base.mail.AuthMail import userRegistered, resendOTPSent
from base.views.baseViews import response, error
from base.modules.auth.api.actions import SendEmailOTPAction

import random
from django.utils import timezone
from datetime import datetime

def send(request):
    user = request.user

    userExtend = UserExtend.objects.get(userId=user.id)

    if userExtend.isEmailVerified:
        return error('Email already verified')
    
    SendEmailOTPAction.send(user=user)

    return response('Email verification sent')

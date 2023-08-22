from base.models import EmailVerify, UserExtend
from base.mail.AuthMail import userRegistered, resendOTPSent
from base.views.baseViews import response, error
from base.modules.auth.api.actions import SendEmailOTPAction
from base.events.api import ResendVerificationEmailSent

import random
from django.utils import timezone
from datetime import datetime

def send(request):
    user = request.user

    userExtend = UserExtend.objects.get(userId=user.id)

    if userExtend.isEmailVerified:
        return error('Email already verified')
    
    ResendVerificationEmailSent.dispatch(user)

    return response('Email verification sent')

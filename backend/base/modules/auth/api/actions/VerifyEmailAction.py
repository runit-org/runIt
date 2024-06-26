from base.models import EmailVerify, UserExtend
from base.mail.AuthMail import userRegistered, resendOTPSent
from base.views.baseViews import response, error
from base.traits import NotifyUser
from base.events.api import UserVerifiedEmail

import random
from django.utils import timezone
from datetime import datetime

def verify(request):
    data = request.data
    user = request.user

    userExtend = UserExtend.objects.get(userId=user.id)
    
    if userExtend.isEmailVerified:
        return error('User has already verified their email')
    
    if not EmailVerify.objects.filter(user=user).exists():
        return error('User have not submitted OTP request')
    
    tokenObject = EmailVerify.objects.get(user=user)

    if tokenObject.isTokenExpired():
        return error('Token expired')
    
    if tokenObject.token != data['token']:
        return error('Invalid token')
    
    userExtend.isEmailVerified = True
    userExtend.save()

    UserVerifiedEmail.dispatch(user)

    return response('Email verified successfully')

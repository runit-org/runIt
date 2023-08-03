from base.models import User, UserExtend, EmailVerify
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer
from base.mail.AuthMail import userRegistered, resendOTPSent
from base.traits import NotifyUser

import random
from django.utils import timezone
from datetime import datetime

def generateOTP():
    return ''.join(random.choice('0123456789') for _ in range(6))

def send(user):
    newUser = True
    if EmailVerify.objects.filter(user=user).exists():
        newUser = False

    token = generateOTP()

    emailVerify = EmailVerify.objects.get_or_create(user=user)
    emailVerify.createdAt = timezone.make_aware(datetime.now())
    emailVerify.token = token
    emailVerify.save()

    if newUser:
        userRegistered(
            user.username,
            token,
            user.email,
        )
    else:
        resendOTPSent(
            user.username,
            token,
            user.email,
        )

from base.models import EmailVerify
from base.mail.AuthMail import userRegistered, resendOTPSent

import random
from django.utils import timezone
from datetime import datetime

def generateOTP():
    return ''.join(random.choice('0123456789') for _ in range(6))

def send(user):

    token = generateOTP()

    emailVerify, created = EmailVerify.objects.get_or_create(user=user)
    emailVerify.createdAt = timezone.make_aware(datetime.now())
    emailVerify.token = token
    emailVerify.save()

    if created:
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

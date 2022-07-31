from django.core.mail import send_mail
from base.enums import Utils

def send(subject, message, to):
    send_mail(
        subject,
        message,
        Utils.get.DEFAULT_EMAIL_SENDER.value,
        [to],
        fail_silently=False,
    )
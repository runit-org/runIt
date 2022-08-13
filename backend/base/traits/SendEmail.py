from django.core.mail import send_mail
from django.template.loader import render_to_string
from base.enums import Utils

def send(subject, message, to):
    html_message = render_to_string('mail_template.html', {'context': 'values'})
    send_mail(
        subject,
        message,
        Utils.get.DEFAULT_EMAIL_SENDER.value,
        [to],
        fail_silently=False,
    )
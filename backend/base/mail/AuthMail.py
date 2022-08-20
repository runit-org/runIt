from django.core.mail import send_mail
from django.template.loader import render_to_string
from base.enums import Utils
from django.utils.html import strip_tags

def userRegistered(username, to):
    html_message = render_to_string('user-registered-template.html', {'username': username})
    text_content = strip_tags(html_message)
    send_mail(
        'Account Created',
        text_content,
        Utils.get.DEFAULT_EMAIL_SENDER.value,
        [to],
        fail_silently=False,
        html_message=html_message
    )

def resetPasswordEmailSent(url, to):
    html_message = render_to_string('reset-password-email-template.html', {'url': url})
    text_content = strip_tags(html_message)
    send_mail(
        'Reset Password',
        text_content,
        Utils.get.DEFAULT_EMAIL_SENDER.value,
        [to],
        fail_silently=False,
        html_message=html_message
    )
from django.core.mail import send_mail

def send():
    send_mail(
        'Subject here',
        'Here is the message.',
        'from@example.com',
        ['juliantj88@gmail.com'],
        fail_silently=False,
    )
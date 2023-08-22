from events import EventListener
from base.events.api import UserRegistered
from base.traits import NotifyUser
from base.modules.auth.api.actions import SendEmailOTPAction

def sendNotification(user):
    message = 'Welcome to runIt, <b>' + user.username + '</b>! Please verify your email for full access.'
    NotifyUser.notify(user.id, message)

class UserRegisteredListener(EventListener):
    listensFor = [
        UserRegistered,
    ]

    def handle_event(self, event):
        user = event.user
        sendNotification(user)
        SendEmailOTPAction.send(user)

        pass
    pass

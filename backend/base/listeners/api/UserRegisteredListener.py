from events import EventListener
from base.events.api import UserRegistered
from base.traits import NotifyUser, LogUserActivity
from base.enums import ActivityLogTypes
from base.modules.auth.api.actions import SendEmailOTPAction

def sendNotification(user):
    message = 'Welcome to runIt, <b>' + user.username + '</b>! Please verify your email for full access.'
    NotifyUser.notify(user.id, message)

def logUserActivity(user):
    title = 'Account registered'
    type = ActivityLogTypes.get.ACCOUNT.value
    details = 'You joined runIt.'
    LogUserActivity.log(user.id, title, type, details)

class UserRegisteredListener(EventListener):
    listensFor = [
        UserRegistered,
    ]

    def handle_event(self, event):
        user = event.user
        sendNotification(user)
        logUserActivity(user)
        SendEmailOTPAction.send(user)

        pass
    pass

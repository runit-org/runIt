from events import EventListener
from base.events.api import PasswordReset
from base.traits import LogUserActivity
from base.enums import ActivityLogTypes

def logUserActivity(user):
    title = 'Reset password'
    type = ActivityLogTypes.get.ACCOUNT.value
    details =  'You successfully reset your password.'
    LogUserActivity.log(user.id, title, type, details)

class PasswordResetListener(EventListener):
    listensFor = [
        PasswordReset,
    ]

    def handle_event(self, event):
        user = event.user
        logUserActivity(user)
        pass
    pass

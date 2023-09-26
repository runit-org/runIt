from events import EventListener
from base.events.api import PasswordChanged
from base.traits import LogUserActivity
from base.enums import ActivityLogTypes

def logUserActivity(user):
    title = 'Changed password'
    type = ActivityLogTypes.get.ACCOUNT.value
    details =  'You changed your password.'
    LogUserActivity.log(user.id, title, type, details)

class PasswordChangedListener(EventListener):
    listensFor = [
        PasswordChanged,
    ]

    def handle_event(self, event):
        user = event.user
        logUserActivity(user)
        pass
    pass

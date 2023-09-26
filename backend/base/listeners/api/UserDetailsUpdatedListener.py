from events import EventListener
from base.events.api import UserDetailsUpdated
from base.traits import LogUserActivity
from base.enums import ActivityLogTypes

def logUserActivity(user):
    title = 'Updated profile'
    type = ActivityLogTypes.get.ACCOUNT.value
    link = '/profile?user=' + user.username
    details =  'You updated your profile details.'
    LogUserActivity.log(user.id, title, type, details, link)

class UserDetailsUpdatedListener(EventListener):
    listensFor = [
        UserDetailsUpdated,
    ]

    def handle_event(self, event):
        user = event.user
        logUserActivity(user)
        pass
    pass

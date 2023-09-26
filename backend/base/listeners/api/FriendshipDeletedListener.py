from events import EventListener
from base.events.api import FriendshipDeleted
from base.traits import LogUserActivity
from base.enums import ActivityLogTypes

def logUserActivity(target, user):
    title = 'Deleted friendship'
    type = ActivityLogTypes.get.FRIENDS.value
    link = '/profile?user=' + user.username
    details = 'Deleted friendship with user <b>' + user.username + '</b>.'  
    LogUserActivity.log(target.id, title, type, details, link)

class FriendshipDeletedListener(EventListener):
    listensFor = [
        FriendshipDeleted,
    ]

    def handle_event(self, event):
        target = event.target
        user = event.user
        logUserActivity(target, user)
        pass
    pass

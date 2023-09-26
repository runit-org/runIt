from events import EventListener
from base.events.api import FriendRequestResponded
from base.traits import NotifyUser, LogUserActivity
from base.enums import ActivityLogTypes

def sendNotification(target, user):
    link = '/profile?user=' + user.username
    notificationMessage = 'User <b>' + user.username + '</b> has accepted your friendship request.'  
    NotifyUser.notify(
        target.id, notificationMessage, link
    )

def logUserActivity(target, user):
    title = 'Responded friend request'
    type = ActivityLogTypes.get.FRIENDS.value
    link = '/profile?user=' + target.username
    notificationMessage = 'Responded friendship request to user <b>' + target.username + '</b>.'  
    LogUserActivity.log(
        user.id, title, type, notificationMessage, link
    )

class FriendRequestRespondedListener(EventListener):
    listensFor = [
        FriendRequestResponded,
    ]

    def handle_event(self, event):
        target = event.target
        user = event.user
        sendNotification(target, user)
        logUserActivity(target, user)
        pass
    pass

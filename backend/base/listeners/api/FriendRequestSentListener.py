from events import EventListener
from base.events.api import FriendRequestSent
from base.traits import NotifyUser, LogUserActivity

def sendNotification(target, user):
    link = '/friend-request/'
    notificationMessage = 'You have a pending friend request from <b>' + user.username + '</b>. Click to manage your friend requests.'  
    NotifyUser.notify(
        target.id, notificationMessage, link
    )

def logUserActivity(target, user):
    link = '/profile?username=' + user.username
    details = 'Requested friendship to user <b>' + target.username + '</b>.'  
    LogUserActivity.log(
        user.id, details, link
    )

class FriendRequestSentListener(EventListener):
    listensFor = [
        FriendRequestSent,
    ]

    def handle_event(self, event):
        target = event.target
        user = event.user
        sendNotification(target, user)
        logUserActivity(target, user)
        pass
    pass

from events import EventListener
from base.events.api import EventCommentCreated
from base.enums import EventMemberStatus
from base.traits import NotifyUser, LogUserActivity

def sendNotification(user, event):
    eventCreatorUserId = event.user.id
    notificationMessage = 'User <b>' + user.username + '</b> commented on your event ' + '<b>' + event.title + '</b>'
    link = '/event/' + str(event.id)
    NotifyUser.notify(eventCreatorUserId, notificationMessage, link)

def logUserActivity(user, event):
    details = 'Commented on event ' + '<b>' + event.title + '</b>'
    link = '/event/' + str(event.id)
    LogUserActivity.log(user.id, details, link)

class EventCommentCreatedListener(EventListener):
    listensFor = [
        EventCommentCreated,
    ]

    def handle_event(self, event):
        user = event.user
        eventObject = event.event
        if user.id != eventObject.user.id:
            sendNotification(user, eventObject)
        logUserActivity(user, eventObject)
        pass
    pass

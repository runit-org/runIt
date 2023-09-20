from events import EventListener
from base.events.api import EventJoinRequestSent
from base.enums import EventMemberStatus
from base.traits import NotifyUser, LogUserActivity

def sendNotification(user, event):
    eventCreatorUserId = event.user.id
    link = '/event/' + str(event.id)
    notificationMessage = 'User <b>' + user.username + '</b> has requested to join your event ' + '<b>' + event.title + '</b>'
    NotifyUser.notify(eventCreatorUserId, notificationMessage, link)

def logUserActivity(user, event):
    link = '/event/' + str(event.id)
    details = 'Requested to join event ' + '<b>' + event.title.upper() + '</b>'
    LogUserActivity.log(user.id, details, link)

class EventJoinRequestSentListener(EventListener):
    listensFor = [
        EventJoinRequestSent,
    ]

    def handle_event(self, event):
        user = event.user
        eventObject = event.event
        sendNotification(user, eventObject)
        logUserActivity(user, eventObject)
        pass
    pass

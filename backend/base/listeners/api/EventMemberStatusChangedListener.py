from events import EventListener
from base.events.api import EventMemberStatusChanged
from base.enums import EventMemberStatus
from base.traits import NotifyUser

def sendNotification(user, event, status):
    link = '/event/' + str(event.id)

    if (status) == EventMemberStatus.get.ACCEPTED.value:
        notifContent = 'Your request to join event <b>' + event.title + '</b> has been ' + EventMemberStatus.get.ACCEPTED.name
        NotifyUser.notify(user.id, notifContent, link)

    elif (status) == EventMemberStatus.get.REJECTED.value:
        notifContent = 'Your request to join event <b>' + event.title + '</b> has been ' + EventMemberStatus.get.REJECTED.name
        NotifyUser.notify(user.id, notifContent, link)
    
    else:
        notifContent = 'Your request to join event <b>' + event.title + '</b> has been removed by the event creator. You may re-apply if you wish.'
        NotifyUser.notify(user.id, notifContent, link)

class EventMemberStatusChangedListener(EventListener):
    listensFor = [
        EventMemberStatusChanged,
    ]

    def handle_event(self, event):
        user = event.user
        status = event.status
        eventObject = event.event
        sendNotification(user, eventObject, status)
        pass
    pass

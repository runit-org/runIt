from events import EventListener
from base.events.api import EventCommentLiked
from base.traits import NotifyUser

def sendNotification(user, comment):
    link = '/event/' + str(comment.event.id)
    notifDetails = 'User <b>' + user.username + '</b> liked your comment: <i>' + comment.content + '</i>' 
    NotifyUser.notify(comment.user.id, notifDetails, link)

class EventCommentLikedListener(EventListener):
    listensFor = [
        EventCommentLiked,
    ]

    def handle_event(self, event):
        user = event.user
        comment = event.comment
        sendNotification(user, comment)
        pass
    pass

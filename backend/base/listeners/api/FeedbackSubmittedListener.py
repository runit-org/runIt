from events import EventListener
from base.events.api import FeedbackSubmitted
from base.traits import LogUserActivity

def logUserActivity(user, feedback):
    details =  'Submitted feedback: <i>' + feedback.details + '</i>.'
    LogUserActivity.log(user.id, details)

class FeedbackSubmittedListener(EventListener):
    listensFor = [
        FeedbackSubmitted,
    ]

    def handle_event(self, event):
        user = event.user
        feedback = event.feedback
        logUserActivity(user, feedback)
        pass
    pass

from base.models import User, Feedback
from base.events.BaseEvent import BaseEvent

class FeedbackSubmitted(BaseEvent):
    def __init__(self, user: User, feedback: Feedback):
        self.user = user
        self.feedback = feedback
        super().__init__()

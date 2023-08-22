from base.models import User, EventComment
from base.events.BaseEvent import BaseEvent

class EventCommentLiked(BaseEvent):
    def __init__(self, user: User, comment: EventComment):
        self.user = user
        self.comment = comment
        super().__init__()

from base.models import User
from base.events.BaseEvent import BaseEvent

class EventDeleted(BaseEvent):
    def __init__(self, eventTitle: str, user: User):
        self.eventTitle = eventTitle
        self.user = user
        super().__init__()

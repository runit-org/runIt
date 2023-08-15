from base.models import User, Event
from base.events.BaseEvent import BaseEvent

class EventMemberStatusChanged(BaseEvent):
    def __init__(self, event: Event, user: User, status: int):
        self.event = event
        self.user = user
        self.status = status
        super().__init__()

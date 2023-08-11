from events import Event
from base.models import User
from base.events.BaseEvent import BaseEvent

class UserRegistered(BaseEvent):
    def __init__(self, user: User):
        self.user = user
        super().__init__()

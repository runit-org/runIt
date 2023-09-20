from base.models import User
from base.events.BaseEvent import BaseEvent

class FriendshipDeleted(BaseEvent):
    def __init__(self, target: User, user: User):
        self.target = target
        self.user = user
        super().__init__()

from enum import Enum

class NotificationStatus(Enum):
    UNREAD = 0
    READ   = 1

class EventMemberStatus(Enum):
    PENDING  = 0
    ACCEPTED = 1
    REJECTED = 2
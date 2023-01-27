from enum import Enum

class get(Enum):
    NO_REQUESTS               = 0
    CURRENT_USER_REQUESTED    = 1
    AWAITING_CURRENT_USER     = 2
    FRIENDS                   = 3
from enum import Enum
from base.enums import ActivityLogTypes

class get(Enum):
    PRIVATE     = [ActivityLogTypes.get.ACCOUNT.value, ActivityLogTypes.get.FEEDBACK.value, ActivityLogTypes.get.NOTIFICATION.value]


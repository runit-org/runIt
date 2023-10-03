from enum import Enum
from backend import settings_local

class get(Enum):
    FRONTEND_URL = settings_local.FRONTEND_URL
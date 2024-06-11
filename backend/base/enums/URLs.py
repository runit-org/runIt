from enum import Enum
from backend import settings_local

class get(Enum):
    FRONTEND_URL = getattr(settings_local, 'FRONTEND_URL', 'localhost:3000')
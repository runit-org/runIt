from django.apps import AppConfig
from events import Dispatcher

class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    def ready(self):
        from base.events.api.UserRegistered import UserRegistered
        from base.listeners.api.UserRegisteredListener import UserRegisteredListener

        UserRegistered.register(UserRegisteredListener)


from django.apps import AppConfig
from events import Dispatcher

class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    def ready(self):
        from base.event_registration import register_events

        register_events()


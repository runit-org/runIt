from django.apps import AppConfig
# from .tasks import background_task

class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    # def ready(self):
    #     # Start the background task when the app is ready
    #     background_task()

# from celery import Celery
# import os

# # Set the default Django settings module for the 'celery' program.
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# # Create the Celery application instance.
# app = Celery('backend')

# # Load task modules from all registered Django app configs.
# app.autodiscover_tasks()

# # Set the default configuration for Celery.
# app.conf.broker_url = 'redis://localhost:6379/0'
# app.conf.result_backend = 'redis://localhost:6379/0'
# app.conf.task_default_queue = 'backend'

# if __name__ == '__main__':
#     app.start()






import os
from celery import Celery
from django.core.wsgi import get_wsgi_application
from django.conf import settings

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialize Celery
app = Celery('backend')

# Load Django application
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# Load Django application explicitly
get_wsgi_application()
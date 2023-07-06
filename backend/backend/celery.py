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
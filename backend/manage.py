#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from datetime import timedelta


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
        from django.apps import apps

        execute_from_command_line(sys.argv)

        # Delay scheduling the background task until after the application registry is loaded
        from base.tasks import printTask
        printTask()
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # execute_from_command_line(sys.argv)
    # from base.tasks import printTask
    # printTask()

if __name__ == '__main__':
    main()

from celery import shared_task

@shared_task
def print_a():
    print('a')

from celery import app

@app.task
def print_a():
    print('a')

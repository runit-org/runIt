from background_task import background
from django.contrib.auth.models import User

@background(schedule=10)
def printTask():
    print('asda')
    repeat_interval = timedelta(seconds=5)

    while True:
        # Perform the task logic here
        print('a')

        # Wait for the specified interval
        next_run = datetime.now() + repeat_interval
        while datetime.now() < next_run:
            pass
from base.models import Event

def get(event):
    return str(event.year) + '-' + str(event.month) + '-' + str(event.day) + ' ' + str(event.hour) + ':' + str(event.minute) + ' AEST'    
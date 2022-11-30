import datetime
from django.utils.timezone import utc
from django.utils import timezone

def calculateTime(seconds):
    humanTimeDifference = ""

    # 60 (min), 3600 (hour), 86400 (day), 604800 (week), 2592000 (month), 31536000 (year)

    if (seconds > 31536000):
        humanTimeDifference = str(round(seconds/31536000)) + " year"
    elif (seconds > 2592000):
        humanTimeDifference = str(round(seconds/2592000)) + " month"
    elif (seconds > 604800):
        humanTimeDifference = str(round(seconds/604800)) + " week"
    elif (seconds > 86400):
        humanTimeDifference = str(round(seconds/86400)) + " day"
    elif (seconds > 3600):
        humanTimeDifference = str(round(seconds/3600)) + " hour"
    elif (seconds > 60):
        humanTimeDifference = str(round(seconds/60)) + " minute"
    else:
        humanTimeDifference = str(round(seconds)) + " second"

    numDiff = int(humanTimeDifference.split(' ')[0])
    if numDiff > 1:
        humanTimeDifference+="s"

    return humanTimeDifference

def get(targetTime):
    currentTime = timezone.make_aware(datetime.datetime.now())
    if currentTime > targetTime:
        timeDiff = currentTime - targetTime
    else:
        timeDiff = targetTime - currentTime
    timeDiffSeconds = timeDiff.total_seconds()
    return calculateTime(timeDiffSeconds)

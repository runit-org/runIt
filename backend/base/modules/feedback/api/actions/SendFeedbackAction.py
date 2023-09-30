from base.models import Feedback
from base.views.baseViews import response, error
from base.events.api import FeedbackSubmitted
from base.enums import Utils
from datetime import datetime, timezone
from django.utils import timezone as tz

def checkLastCreated(user):
    findFeedback = Feedback.objects.filter(user=user)
    if len(findFeedback) > 0:
        feedback = findFeedback.latest('createdAt')
        timeNow = tz.make_aware(datetime.now())
        timeFeedbackWasCreated = feedback.createdAt
        timeDifference = (timeNow - timeFeedbackWasCreated).seconds
        if timeDifference < Utils.get.SEND_FEEDBACK_INTERVAL.value:
            return False
        return True
    return True

def create(request):
    data = request.data
    user = request.user

    if not checkLastCreated(user):
        return error('Can only send feedback every 5 minutes')

    feedback = Feedback.objects.create(
        user = user,
        type = data['type'],
        category = data['category'],
        details = data['details'],
        createdAt = tz.make_aware(datetime.now())
    )

    FeedbackSubmitted.dispatch(user, feedback)

    return response('Feedback successfully sent')

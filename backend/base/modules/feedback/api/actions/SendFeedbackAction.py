from base.models import Feedback
from base.views.baseViews import response, error
from base.events.api import FeedbackSubmitted

def create(request):
    data = request.data
    user = request.user

    feedback = Feedback.objects.create(
        user = user,
        details = data['details']
    )

    FeedbackSubmitted.dispatch(user, feedback)

    return response('Feedback successfully sent')

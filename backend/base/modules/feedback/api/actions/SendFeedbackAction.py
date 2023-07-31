from base.models import Feedback
from base.views.baseViews import response, error

def create(request):
    data = request.data
    user = request.user

    Feedback.objects.create(
        user = user,
        details = data['details']
    )

    return response('Feedback successfully sent')

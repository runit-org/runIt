from base.models import Notification
from base.serializers import NotificationSerializer
from base.views.baseViews import response, error
from base.enums import NotificationStatus

def read(request):
    user = request.user
    Notification.objects.filter(userId = user.id).update(status = NotificationStatus.get.READ.value)

    return response('All notifications read')
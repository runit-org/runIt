from base.models import Notification
from base.serializers import NotificationSerializer
from base.views.baseViews import response, error
from base.enums import NotificationStatus

def read(request, pk):
    user = request.user

    if len(Notification.objects.filter(id = pk, userId = user.id)) < 1:
        return error('Notification not found')

    notif = Notification.objects.get(id = pk)
    notif.status = NotificationStatus.NotificationStatus.READ.value
    notif.save()

    return response('Notification read')
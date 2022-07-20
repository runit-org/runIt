from base.models import Notification
from base.serializers import NotificationSerializer
from base.views.baseViews import response, error

def get(request):
    user = request.user

    user_notifications = Notification.objects.filter(userId = user.id)
    serializer = NotificationSerializer(user_notifications, many=True)

    return response('User notifications retrieved', serializer.data)
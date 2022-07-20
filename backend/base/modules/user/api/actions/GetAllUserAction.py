from base.models import User
from base.serializers import UserSerializer
from base.views.baseViews import response, error

def get(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return response(serializer.data)
from base.models import User
from base.serializers import UserSerializer
from rest_framework.decorators import api_view
from base.views.baseViews import response, error

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return response(serializer.data)
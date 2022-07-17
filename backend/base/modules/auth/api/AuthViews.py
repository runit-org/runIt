from base.modules.auth.api.validators import RegisterUserValidator
from base.modules.auth.api.actions import RegisterUserAction
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(['POST'])
def registerUser(request):
    data = request.data
    if (RegisterUserValidator.validate(data) != None):
        return RegisterUserValidator.validate(data)
    
    return RegisterUserAction.register(data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['username'] = self.user.username
        data['email'] = self.user.email
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
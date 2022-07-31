from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from base.modules.auth.api.validators import (
    RegisterUserValidator,
    LogoutValidator,
    SendResetPasswordEmailValidator,
)
from base.modules.auth.api.actions import (
    RegisterUserAction,
    LogoutAction,
    SendResetPasswordEmailAction,
)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['username'] = self.user.username
        data['email'] = self.user.email
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    if (RegisterUserValidator.validate(request) != None):
        return RegisterUserValidator.validate(request)
    
    return RegisterUserAction.register(request)

@csrf_exempt
@api_view(['POST'])
def logout(request):
    if (LogoutValidator.validate(request) != None):
        return LogoutValidator.validate(request)

    return LogoutAction.logout(request)

@api_view(['POST'])
def sendResetPasswordEmail(request):
    if (SendResetPasswordEmailValidator.validate(request) != None):
        return SendResetPasswordEmailValidator.validate(request)

    return SendResetPasswordEmailAction.send(request)
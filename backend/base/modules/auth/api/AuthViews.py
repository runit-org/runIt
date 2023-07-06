from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import datetime
from base.modules.auth.api.validators import (
    RegisterUserValidator,
    LogoutValidator,
    SendResetPasswordEmailValidator,
    ResetPasswordValidator,
)
from base.modules.auth.api.actions import (
    RegisterUserAction,
    LogoutAction,
    SendResetPasswordEmailAction,
    ResetPasswordAction,
)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['username'] = self.user.username
        data['email'] = self.user.email

        self.user.last_login = timezone.make_aware(datetime.now())
        self.user.save()

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

@api_view(['POST'])
def resetPassword(request):
    if (ResetPasswordValidator.validate(request) != None):
        return ResetPasswordValidator.validate(request)

    return ResetPasswordAction.reset(request)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import datetime
from base.models import UserExtend
from base.modules.auth.api.validators import (
    RegisterUserValidator,
    LogoutValidator,
    SendResetPasswordEmailValidator,
    ResetPasswordValidator,
    VerifyEmailValidator,
)
from base.modules.auth.api.actions import (
    RegisterUserAction,
    LogoutAction,
    SendResetPasswordEmailAction,
    ResetPasswordAction,
    ResendVerificationEmailAction,
    VerifyEmailAction,
)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
    
        self.user.last_login = timezone.make_aware(datetime.now())
        self.user.save()

        data['username'] = self.user.username
        data['email'] = self.user.email
        data['last_login'] = self.user.last_login
        data['is_email_verified'] = UserExtend.objects.get(userId=self.user.id).isEmailVerified
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resendVerificationEmail(request):
    return ResendVerificationEmailAction.send(request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verifyEmail(request):
    if (VerifyEmailValidator.validate(request) != None):
        return VerifyEmailValidator.validate(request)

    return VerifyEmailAction.verify(request)

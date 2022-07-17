from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

# add base folder so base.something
from base.models import *
from base.serializers import *

from django.contrib.auth.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# this is to hash the password
from django.contrib.auth.hashers import make_password
# this is for the error handling status code
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from django.views.decorators.csrf import csrf_exempt


from ....views import baseViews as base



from base.modules.user.api.validators import RegisterValidator
from base.modules.user.api.actions import RegisterUserAction


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
    data = request.data
    if (RegisterValidator.validate(data) != None):
        return RegisterValidator.validate(data)
    
    return RegisterUserAction.register(data)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    # many=True means we are serializing multiple products, not just one. if one then false
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def logout (request):
    data = request.data
    if data.get('refresh') == None:
        return base.error('Please provide the refresh token :)') 

    token = RefreshToken(request.data.get('refresh'))
    token.blacklist()
    return base.response('Logout Successful')
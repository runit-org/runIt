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

from . import baseViews as base


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

    if data.get('name') == None or data.get('email') == None or data.get('password') == None:
        return base.error('Required fields not met')

    checkEmailExist = User.objects.filter(email = data['email'])

    if len(checkEmailExist) > 0:
        return base.error('Email taken')

    checkUsernameExist = User.objects.filter(username = data['username'])

    if len(checkUsernameExist) > 0:
        return base.error('Username taken')
    
    user = User.objects.create(
        first_name=data['name'],
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )

    serializer = UserSerializer(user, many=False)
    return base.response('User registered', serializer.data)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    # many=True means we are serializing multiple products, not just one. if one then false
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

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


# Refactored imports from below:



@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    # many=True means we are serializing multiple products, not just one. if one then false
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
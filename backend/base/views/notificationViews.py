from tabnanny import check
from django.shortcuts import render
from django.http import JsonResponse
from base.models import *
from base.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from . import baseViews as base


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
    user = request.user

    user_notifications = Notification.objects.filter(userId = user.id)
    serializer = NotificationSerializer(user_notifications, many=True)
    
    return base.response('User notifications retrieved', serializer.data)


    



    




    


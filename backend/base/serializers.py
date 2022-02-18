from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from base.views.baseViews import getHumanTimeDifferenceToNow

class EventSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return getHumanTimeDifferenceToNow(obj.createdAt)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
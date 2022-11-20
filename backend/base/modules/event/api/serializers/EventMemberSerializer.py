from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.enums import EventMemberStatus
from base.traits import CreateGravatarProfile

class EventMemberSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    status   = serializers.SerializerMethodField(read_only=True)
    email    = serializers.SerializerMethodField(read_only=True)
    gravatarImage = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EventMember
        fields = '__all__'

    def get_username(self, obj):
        user = User.objects.get(id = obj.userId).username
        return user

    def get_status(self, obj):
        return EventMemberStatus.get(obj.status).name

    def get_email(self, obj):
        user = User.objects.get(id = obj.userId).email
        return user

    def get_gravatarImage(self, obj):
        user = User.objects.get(id = obj.userId)
        return CreateGravatarProfile.create(user.email)

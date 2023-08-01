from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.traits import CreateGravatarProfile

class ListVotedUsersSerializer(serializers.ModelSerializer):
    userId = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    email    = serializers.SerializerMethodField(read_only=True)
    gravatarImage = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EventMember
        fields = ['userId', 'username', 'email', 'gravatarImage']

    def get_userId(self, obj):
        user = User.objects.get(id = obj.votedUserId).id
        return user

    def get_username(self, obj):
        user = User.objects.get(id = obj.votedUserId).username
        return user

    def get_email(self, obj):
        user = User.objects.get(id = obj.votedUserId).email
        return user

    def get_gravatarImage(self, obj):
        user = User.objects.get(id = obj.votedUserId)
        return CreateGravatarProfile.create(user.email)

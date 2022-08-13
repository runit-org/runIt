from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.traits import GetHumanTimeDifferenceToNow

class AffiliatedEventSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)
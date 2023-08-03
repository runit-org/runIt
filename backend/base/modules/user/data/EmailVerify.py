from django.db import models
from base.models import *
from datetime import datetime, timezone
from base.enums import Utils

class EmailVerify(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    token = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(null=True)

    def __str__(self):
        return self.id
    
    def isTokenExpired(self):
        timeNow = datetime.now(timezone.utc)
        timeTokenWasCreated = self.createdAt
        timeDifference = (timeNow - timeTokenWasCreated).seconds

        return timeDifference > Utils.get.PASSWORD_RESET_EXPIRY_TIME.value

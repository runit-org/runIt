from django.db import models
from base.models import *

class EmailVerify(models.Model):
    email = models.CharField(max_length=200, null=True, blank=True)
    token = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(null=True)

    def __str__(self):
        return self.id
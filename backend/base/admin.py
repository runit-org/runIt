from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserExtend)
admin.site.register(Event)
admin.site.register(EventMember)
admin.site.register(EventCategory)
admin.site.register(EventComment)
admin.site.register(EventCommentLike)
admin.site.register(Notification)
admin.site.register(UserVote)
admin.site.register(Friend)
admin.site.register(FriendRequest)
admin.site.register(Feedback)

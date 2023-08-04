from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from base.models import UserExtend

class IsEmailVerified(BasePermission):
    message = 'This route is only accessible to email-verified accounts'
    def has_permission(self, request, view):
        userExtend = UserExtend.objects.get(userId=request.user.id)
        if not (request.user.is_authenticated and userExtend.isEmailVerified):
            raise PermissionDenied(detail=self.message)
        return True

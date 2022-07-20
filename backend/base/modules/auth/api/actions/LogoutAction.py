from django.contrib.auth.models import User
from base.views.baseViews import response, error
from rest_framework_simplejwt.tokens import RefreshToken

def logout(request):
    data = request.data

    token = RefreshToken(request.data.get('refresh'))
    token.blacklist()
    
    return response('Logout Successful')
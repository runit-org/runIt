from base.models import User, UserExtend
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer
from base.mail.AuthMail import userRegistered

def register(request):
    data = request.data
    if len(User.objects.filter(email = data['email'])) > 0:
        return error('Email taken')

    if len(User.objects.filter(username = data['username'])) > 0:
        return error('Username taken')

    user = User.objects.create(
        first_name=data['name'],
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )

    userExtend = UserExtend.objects.create(
        userId = user.id,
    )

    userRegistered(
        user.username,
        user.email
    )

    serializer = UserSerializer(user, many=False)
    return response('User registered', serializer.data)
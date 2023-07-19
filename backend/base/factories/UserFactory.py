import factory
from base.models import User, UserExtend
from django.contrib.auth.hashers import make_password

class UserFactory(factory.Factory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.Sequence(lambda n: f'user{n}@example.com')
    password = make_password('password123*')

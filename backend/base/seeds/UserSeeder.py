from base.models import User, UserExtend
from django.contrib.auth.hashers import make_password

def create_seed_data():
    create_individual_user('felixgoodman', 'felixgoodman@email.com', 'password')
    create_individual_user('johntallman', 'johntallman@email.com', 'password')
    create_individual_user('solomonwest', 'solomonwest@email.com', 'password')
    create_individual_user('kevinsmith', 'kevinsmith@email.com', 'password')
    create_individual_user('josepheast', 'josepheast@email.com', 'password')
    create_individual_user('aaronblack', 'aaronblack@email.com', 'password')
    create_individual_user('arthurpendragon', 'arthurpendragon@email.com', 'password')
    create_individual_user('evagreen', 'evagreen@email.com', 'password')
    create_individual_user('leexavier', 'leexavier@email.com', 'password')
    create_individual_user('walterhuberman', 'walterhuberman@email.com', 'password')
    print('Users seeded successfully')

def create_individual_user(username, email, password):
    user = User.objects.create(username=username, email=email, password=make_password(password))
    userExtend = UserExtend.objects.create(userId=user.id, isEmailVerified=True)

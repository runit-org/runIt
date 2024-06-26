from base.views.baseViews import validationError
from base.enums import Utils

import re

def validate(request):
    data = request.data
    if data.get('email') == None or data.get('username') == None or data.get('password') == None or data.get('c_password') == None:
        return validationError('Required fields not met')
    
    if len(data['email']) > Utils.get.MAX_CRED_LENGTH.value:
        return validationError('Email too long')
    
    if len(data['password']) > Utils.get.MAX_CRED_LENGTH.value:
        return validationError('Password too long')
    
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, data['email']):
        return validationError('Invalid email format')
    
    if ' ' in data['username']:
        return validationError('Username cannot contain spaces')
    
    if len(data['username']) < 5:
        return validationError('Username is too short (5 chars min)')

    if len(data['username']) > 30:
        return validationError('Username is too long (30 chars max)')
    
    if data.get('password') != data.get('c_password'):
        return validationError('Confirm password does not match')
    
    if data['username'] == 'everyone':
        return validationError('Invalid username')
    
    password_regex = r"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    if not re.match(password_regex, data['password']):
        return validationError('Invalid password format', [
                {
                    'password' : 
                        [
                            'Minimum 8 characters',
                            'At least 1 number',
                            'At least 1 alphabetical letter',
                            'At least 1 special character (e.g., @$!%*#?&)'
                        ]
                }
            ]
        )

    return None
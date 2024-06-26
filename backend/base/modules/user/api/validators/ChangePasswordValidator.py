from base.views.baseViews import validationError
import re

def validate(request):
    data = request.data
    
    if data.get('password') == None or data.get('c_password') == None or data.get('current_password') == None:
        return validationError('Required fields not met')
    
    if data.get('password') != data.get('c_password'):
        return validationError('Confirm password does not match')

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
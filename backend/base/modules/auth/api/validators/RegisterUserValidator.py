from base.views.baseViews import validationError

def validate(data):
    if data.get('name') == None or data.get('email') == None or data.get('username') == None or data.get('password') == None or data.get('c_password') == None:
        return validationError('Required fields not met')
    
    if data.get('password') != data.get('c_password'):
        return validationError('Confirm password does not match')

    return None
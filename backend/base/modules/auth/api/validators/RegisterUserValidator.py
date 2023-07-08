from base.views.baseViews import validationError

def validate(request):
    data = request.data
    if data.get('email') == None or data.get('username') == None or data.get('password') == None or data.get('c_password') == None:
        return validationError('Required fields not met')

    if len(data['username']) > 30:
        return validationError('Username is too long (30 chars max)')
    
    if data.get('password') != data.get('c_password'):
        return validationError('Confirm password does not match')
    
    if data['username'] == 'everyone':
        return validationError('Invalid username')

    return None
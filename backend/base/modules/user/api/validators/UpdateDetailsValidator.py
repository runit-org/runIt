from base.views.baseViews import validationError

def validate(request):
    data = request.data
    
    if data.get('username') == None:
        return validationError('Required fields not met')
    
    if ' ' in data['username']:
        return validationError('Username cannot contain spaces')
    
    if len(data['username']) < 5:
        return validationError('Username is too short (5 chars min)')

    if len(data['username']) > 30:
        return validationError('Username is too long (30 chars max)')

    if str(data['username']) == '' or str(data['username']).isspace() == True:
        return validationError('Username cannot be empty')

    return None
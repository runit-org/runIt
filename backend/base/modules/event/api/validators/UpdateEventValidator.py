from base.views.baseViews import validationError

def validate(request):
    data = request.data
    
    if data.get('title') == None or data.get('maxMember') == None or data.get('details') == None or data.get('tags') == None:
        return validationError('Required fields not met')

    if str(data['title']) == '' or str(data['title']).isspace() == True:
        return validationError('Title cannot be empty')

    if  isinstance(data['maxMember'], int) == False:
        return validationError('Max member must be integer')
    
    if data['maxMember'] < 2:
        return validationError('Max member must be more than 1')

    return None
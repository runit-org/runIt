from base.views.baseViews import validationError

def validate(request):
    data = request.data

    if data.get('details') == None or str(data['details']) == '':
        return validationError('Please provide the details field')

    return None
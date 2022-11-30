from base.views.baseViews import validationError

from datetime import datetime

def validate(request):
    data = request.data

    if data.get('title') == None or data.get('maxMember') == None or data.get('details') == None:
        return validationError('Please provide the following fields: title, maxMember, details')

    if data.get('year') == None or data.get('month') == None or data.get('day') == None or data.get('hour') == None or data.get('minute') == None:
        return validationError('Please provide the following fields: year, month, day, hour, minute')

    if str(data['title']) == '' or str(data['title']).isspace() == True:
        return validationError('Title cannot be empty')

    if isinstance(data['maxMember'], int) == False:
        return validationError('Max member must be integer')
    
    if data['maxMember'] < 2:
        return validationError('Max member must be more than 1')

    if not isinstance(data['year'], int) or not isinstance(data['month'], int) or not isinstance(data['day'], int) or not isinstance(data['hour'], int) or not isinstance(data['minute'], int):
        return validationError('The dates format must be integer') 

    if data['year'] != datetime.now().year:
        return validationError('The eventmatcher app does not provide event planning outside the current year')

    if data['month'] < 1 or data['month'] > 12:
        return validationError('Invalid month')

    if data['hour'] < 0 or data['hour'] > 24:
        return validationError('Invalid hour')

    if data['minute'] < 1 or data['minute'] > 59:
        return validationError('Invalid minute')

    oddMonths = [1, 3, 5, 7, 8, 10, 12]
    evenMonths = [2, 4, 6, 9, 11]

    if data['month'] in oddMonths:
        if data['day'] > 31:
            return validationError('Invalid day')

    if data['month'] in evenMonths:
        if data['day'] > 30:
            return validationError('Invalid day')

    eventDate = datetime(data['year'], data['month'], data['day'], data['hour'], data['minute'])

    if eventDate < datetime.now():
        return validationError('Event date must be in the future!!!')

    differenceToNowSeconds = (eventDate - datetime.now()).total_seconds()

    if differenceToNowSeconds < 3600:
        return validationError('Event must be at least an hour from now')

    return None
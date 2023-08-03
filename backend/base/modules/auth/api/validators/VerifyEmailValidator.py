from base.views.baseViews import validationError
from base.enums import Utils

def validate(request):
    data = request.data
    if data.get('token') == None:
        return validationError('Required fields not met')
    
    if len(data['token']) != Utils.get.EMAIL_VERIFICATION_TOKEN_OTP_LENGTH.value or not data['token'].isdigit():
        return validationError('Invalid token')

    return None
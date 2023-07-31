from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.feedback.api.validators import (
    SendFeedbackValidator
)
from base.modules.feedback.api.actions import (
    SendFeedbackAction
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sendFeedback(request):
    if (SendFeedbackValidator.validate(request) != None):
        return SendFeedbackValidator.validate(request)

    return SendFeedbackAction.create(request)


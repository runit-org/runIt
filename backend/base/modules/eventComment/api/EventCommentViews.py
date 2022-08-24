from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.eventComment.api.validators import (
    CreateEventCommentValidator,
    UpdateEventCommentValidator,
)
from base.modules.eventComment.api.actions import (
    ViewCommentFromEventAction, 
    CreateEventCommentAction,
    UpdateEventCommentAction,
    DeleteEventCommentAction,
    LikeUnlikeEventCommentAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request, eventId):
    if (CreateEventCommentValidator.validate(request) != None):
        return CreateEventCommentValidator.validate(request)

    return CreateEventCommentAction.create(request, eventId)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewEventComments(request, eventId):
    return ViewCommentFromEventAction.view(request, eventId)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateComment(request, commentId):
    if (UpdateEventCommentValidator.validate(request) != None):
        return UpdateEventCommentValidator.validate(request)

    return UpdateEventCommentAction.update(request, commentId)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteComment(request, commentId):
    return DeleteEventCommentAction.delete(request, commentId)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def likeOrUnlike(request, commentId):
    return LikeUnlikeEventCommentAction.update(request, commentId)

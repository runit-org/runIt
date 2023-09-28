from base.models import UserActivity
from base.enums import ActivityLogTypes
from base.factories import UserActivityFactory

def create_seed_data():
    create_activity_for_one_user(1)
    create_activity_for_one_user(2)
    create_activity_for_one_user(3)
    create_activity_for_one_user(4)
    create_activity_for_one_user(5)
    create_activity_for_one_user(6)
    create_activity_for_one_user(7)
    create_activity_for_one_user(8)
    create_activity_for_one_user(9)
    create_activity_for_one_user(10)

    print('User Activities seeded successfully')

def create_activity_for_one_user(targetUserId):
    create_individual_activity(targetUserId, ActivityLogTypes.get.COMMENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.EVENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.ACCOUNT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.FRIENDS.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.FRIENDS.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.NOTIFICATION.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.FEEDBACK.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.EVENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.COMMENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.COMMENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.FRIENDS.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.EVENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.COMMENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.EVENT.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.FRIENDS.value)
    create_individual_activity(targetUserId, ActivityLogTypes.get.COMMENT.value)

def create_individual_activity(targetUserId, type):
    activityData = UserActivityFactory.build().__dict__
    activityData.pop('_state', None)

    activity = UserActivity.objects.create(**activityData)
    activity.userId = targetUserId
    activity.type = type
    activity.save()

import factory
from django.utils import timezone
from base.models import UserActivity
from base.factories import UserFactory, EventFactory
from base.enums import ActivityLogTypes

class UserActivityFactory(factory.Factory):
    class Meta:
        model = UserActivity

    details = factory.Faker('sentence', nb_words=15)
    link = factory.Faker('image_url')
    title = factory.Faker('sentence', nb_words=5)
    type = ActivityLogTypes.get.COMMENT.value
    createdAt = factory.LazyFunction(timezone.now)

    @factory.lazy_attribute
    def userId(self):
        user = UserFactory.create()
        return user.id

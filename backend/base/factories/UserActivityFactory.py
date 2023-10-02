import factory
import random
from django.utils import timezone
from datetime import timedelta
from base.models import UserActivity
from base.factories import UserFactory, EventFactory
from base.enums import ActivityLogTypes

def random_datetime():
    now = timezone.now()
    min_datetime = now - timedelta(days=720)  # 24 months ago
    max_datetime = now - timedelta(days=14)   # 2 weeks ago
    random_days = random.randint(14, 720)     # Random number of days between 2 weeks to 24 months
    random_delta = timedelta(days=random_days)
    return max_datetime - random_delta

class UserActivityFactory(factory.Factory):
    class Meta:
        model = UserActivity

    details = factory.Faker('sentence', nb_words=15)
    link = factory.Faker('image_url')
    title = factory.Faker('sentence', nb_words=5)
    type = ActivityLogTypes.get.COMMENT.value
    createdAt = factory.LazyFunction(random_datetime)

    @factory.lazy_attribute
    def userId(self):
        user = UserFactory.create()
        return user.id

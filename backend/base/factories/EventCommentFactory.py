import factory
from django.utils import timezone
from base.models import EventComment
from base.factories import UserFactory, EventFactory

class EventCommentFactory(factory.Factory):
    class Meta:
        model = EventComment

    content = factory.Faker('sentence', nb_words=15)
    createdAt = factory.LazyFunction(timezone.now)

    @factory.lazy_attribute
    def user(self):
        return UserFactory.create()

    @factory.lazy_attribute
    def event(self):
        return EventFactory.create()

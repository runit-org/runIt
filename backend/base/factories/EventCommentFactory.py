import factory
from base.models import EventComment
from base.factories import UserFactory, EventFactory

class EventCommentFactory(factory.Factory):
    class Meta:
        model = EventComment

    content = factory.Faker('sentence', nb_words=15)

    @factory.lazy_attribute
    def user(self):
        return UserFactory.create()

    @factory.lazy_attribute
    def event(self):
        return EventFactory.create()

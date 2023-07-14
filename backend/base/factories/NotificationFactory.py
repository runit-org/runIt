import factory
from base.models import Notification
from base.factories import UserFactory
from base.enums import NotificationStatus

class NotificationFactory(factory.Factory):
    class Meta:
        model = Notification

    details = factory.Faker('sentence', nb_words=15)
    status = NotificationStatus.get.UNREAD.value
    link = factory.Faker('image_url')

    @factory.lazy_attribute
    def userId(self):
        return UserFactory.create().id

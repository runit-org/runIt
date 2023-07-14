import factory
import datetime
import random
from base.models import Event
from base.factories import UserFactory
from base.enums import EventStatus
from django.utils import timezone

class EventFactory(factory.Factory):
    class Meta:
        model = Event

    # i want these 2 to be run only during .build(), not .create()
    # user = UserFactory.create()
    # userName = user.username
    # end

    title = factory.Faker('sentence', nb_words=5)
    maxMember = factory.Faker('random_int', min=3, max=8)
    details = factory.Faker('sentence', nb_words=15)
    year = (datetime.date.today() + datetime.timedelta(days=1)).year
    month = (datetime.date.today() + datetime.timedelta(days=1)).month
    day = (datetime.date.today() + datetime.timedelta(days=1)).day
    hour = factory.LazyFunction(lambda: random.randint(20, 23))
    minute = factory.LazyFunction(lambda: random.randint(10, 59))
    status = EventStatus.get.PENDING.value
    startDate = factory.LazyAttribute(lambda obj: timezone.make_aware(datetime.datetime(obj.year, obj.month, obj.day, obj.hour, obj.minute)))
    createdAt = factory.LazyFunction(timezone.now)

    @factory.lazy_attribute
    def user(self):
        return UserFactory.create()

    @factory.lazy_attribute
    def userName(self):
        return self.user.username

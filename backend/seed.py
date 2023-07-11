from django.core.management.base import BaseCommand
from myapp.models import MyModel

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **options):
        # Create seed data using objects.create()
        MyModel.objects.create(name='Object 1', description='Description 1')
        MyModel.objects.create(name='Object 2', description='Description 2')
        MyModel.objects.create(name='Object 3', description='Description 3')

        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))

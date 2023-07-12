from django.core.management.base import BaseCommand
from base.seeds import GeneralSeeders

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **options):
        GeneralSeeders.seed()
        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))

from django.core.management.base import BaseCommand
from base.seeds.Seeders import *

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **options):
        UserSeeder.create_seed_data()
        

        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))

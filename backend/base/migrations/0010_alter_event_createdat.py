# Generated by Django 4.0.1 on 2022-12-02 12:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_event_createdat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='createdAt',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 2, 23, 33, 44, 905295)),
        ),
    ]

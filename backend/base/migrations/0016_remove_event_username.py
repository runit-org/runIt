# Generated by Django 4.0.1 on 2023-07-27 02:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_userextend_statusmessage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='userName',
        ),
    ]

# Generated by Django 4.0.1 on 2022-12-03 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_alter_event_createdat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='createdAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eventcomment',
            name='createdAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='notification',
            name='createdAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]

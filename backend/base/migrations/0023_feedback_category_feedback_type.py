# Generated by Django 4.0.1 on 2023-09-23 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0022_alter_useractivity_createdat'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='category',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='feedback',
            name='type',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]

# Generated by Django 4.0.1 on 2023-05-15 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_eventcategory'),
    ]

    operations = [
        migrations.AddField(
            model_name='userextend',
            name='statusMessage',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]

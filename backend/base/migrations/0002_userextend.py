# Generated by Django 4.0.1 on 2022-07-31 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserExtend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.IntegerField(blank=True, default=0, null=True)),
                ('resetToken', models.CharField(blank=True, max_length=200, null=True)),
                ('resetTokenTime', models.DateTimeField(null=True)),
            ],
        ),
    ]
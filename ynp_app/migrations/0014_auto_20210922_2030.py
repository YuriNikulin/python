# Generated by Django 3.2.6 on 2021-09-22 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ynp_app', '0013_auto_20210922_1943'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='time_estimated',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='time_remaining',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='time_spent',
            field=models.FloatField(blank=True, null=True),
        ),
    ]

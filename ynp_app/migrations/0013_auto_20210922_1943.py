# Generated by Django 3.2.6 on 2021-09-22 19:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ynp_app', '0012_auto_20210922_1941'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='estimated_time',
            new_name='time_estimated',
        ),
        migrations.RenameField(
            model_name='task',
            old_name='remaining_time',
            new_name='time_remaining',
        ),
        migrations.RenameField(
            model_name='task',
            old_name='spent_time',
            new_name='time_spent',
        ),
    ]

# Generated by Django 3.2.6 on 2021-09-22 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ynp_app', '0016_auto_20210922_2130'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='related_tasks',
        ),
        migrations.AddField(
            model_name='task',
            name='related_tasks',
            field=models.ManyToManyField(blank=True, null=True, related_name='_ynp_app_task_related_tasks_+', to='ynp_app.Task'),
        ),
    ]

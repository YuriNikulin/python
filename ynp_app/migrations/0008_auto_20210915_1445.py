# Generated by Django 3.2.6 on 2021-09-15 14:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ynp_app', '0007_auto_20210915_0852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='assignee',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='task_assignee', to='ynp_app.user'),
        ),
        migrations.AlterField(
            model_name='task',
            name='related_tasks',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ynp_app.task'),
        ),
        migrations.AlterField(
            model_name='task',
            name='tag',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ynp_app.tag'),
        ),
    ]
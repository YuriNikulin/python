# Generated by Django 3.2.6 on 2021-09-08 19:36

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('ynp_app', '0003_alter_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.UUIDField(default=uuid.UUID('96f8766b-c242-4be3-b289-0bd90528714e'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]
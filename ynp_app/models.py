from django.db import models
import uuid


class User(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, null=True)
    current_document = models.JSONField(null=True)

    @classmethod
    def create(cls, name=None):
        user = cls(name=name)
        return user

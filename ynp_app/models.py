from django.db import models
import uuid


class User(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, null=True)
    current_document = models.JSONField(null=True)

    def __str__(self):
        return self.name

    @classmethod
    def is_active(cls):
        return True

    @classmethod
    def create(self, name=None):
        user = self(name=name)
        return user


class Tag(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True, editable=False)
    name = models.CharField(max_length=50)

    @classmethod
    def create(cls, validated_data):
        return cls.create(**validated_data)


    def __str__(self):
        return f'Tag {self.name}'


class Task(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True, editable=False)
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=2000, null=True, blank=True)
    related_tasks = models.ManyToManyField('self', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_author', null=True, blank=True)
    assignee = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='%(class)s_assignee')
    tags = models.ManyToManyField(Tag, null=True)
    priority = models.CharField(max_length=2, null=True, blank=True, choices=(
        ('1', 'Minor'),
        ('2', 'Medium'),
        ('3', 'High'),
        ('4', 'Critical'),
        ('5', 'Blocker')    ,
    ))
    status = models.CharField(max_length=2, null=True, blank=True, choices=(
        ('1', 'Backlog'),
        ('2', 'To do'),
        ('3', 'In progress'),
        ('4', 'Testing'),
        ('5', 'Tested'),
        ('6', 'Reopen'),
        ('7', 'Done'),
        ('8', 'Frozen'),
    ))
    time_estimated = models.FloatField(null=True, blank=True)
    time_spent = models.FloatField(null=True, blank=True)
    time_remaining = models.FloatField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)

    @classmethod
    def create(cls, validated_data, *args, **kwargs):
        return cls.create(**validated_data)


    def save(self, *args, **kwargs):
        time_estimated = self.time_estimated or 0
        time_spent = self.time_spent or 0
        new_time_remaining = time_estimated - time_spent
        if new_time_remaining < 0:
            new_time_remaining = 0
        self.time_remaining = new_time_remaining
        super(Task, self).save(*args, **kwargs)


    def __str__(self):
        return f'Task {self.name}'

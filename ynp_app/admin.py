from django.contrib import admin
from .models import Task, User, Tag

admin.site.register(Task)
admin.site.register(User)
admin.site.register(Tag)

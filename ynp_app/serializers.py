from rest_framework import serializers
from .models import Task, User, Tag


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class TaskListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)
    author = UserSerializer(read_only=True)
    assignee = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'tags', 'author', 'assignee', 'priority', 'status']


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class TaskSingleSerializerGet(serializers.ModelSerializer):
    assignee = UserSerializer(read_only=True)
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Task
        fields = "__all__"

from django.shortcuts import render
from rest_framework.response import Response
from django.http.response import HttpResponseBadRequest
from rest_framework.generics import ListCreateAPIView, get_object_or_404, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from django.views.decorators.csrf import csrf_exempt
from ynp_app.models import Task, Tag
from ynp_app.serializers import TaskListSerializer, TaskSingleSerializerGet, TaskCreateSerializer, TagSerializer


def index(request):
    return render(request, 'app_task_manager/index.html')


class TaskView(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer

    def get_queryset(self):
        filters = {}
        return Task.objects.all()

    def post(self, request):
        serializer = TaskCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({})
        return Response({
            "errors": serializer.error_messages
        }, status=400)


class SingleTaskView(RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSingleSerializerGet

    def patch(self, request, pk):
        task = self.get_object()
        serializer = TaskCreateSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({})
        return Response({
            "errors": serializer.error_messages
        }, status=400)


class TagView(ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TaskTagView(GenericAPIView):
    tasks = Task.objects.all()
    tags = Tag.objects.all()

    def __get_task_and_tag(self, task_id, tag_id):
        return get_object_or_404(pk=task_id, queryset=self.tasks), get_object_or_404(pk=tag_id, queryset=self.tags)

    def post(self, request, pk, tag_id):
        (task, tag) = self.__get_task_and_tag(pk, tag_id)
        task_tags = task.tags
        task_tags.add(tag)
        task.save()
        return Response({})

    def delete(self, request, pk, tag_id):
        (task, tag) = self.__get_task_and_tag(pk, tag_id)
        task_tags = task.tags
        task_tags.remove(tag)
        task.save()

        return Response({})

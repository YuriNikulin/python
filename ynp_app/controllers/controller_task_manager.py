from django.shortcuts import render
from rest_framework.response import Response
from django.core.paginator import Paginator
from rest_framework.generics import ListCreateAPIView,\
    CreateAPIView,\
    ListAPIView,\
    get_object_or_404,\
    RetrieveUpdateAPIView,\
    RetrieveUpdateDestroyAPIView,\
    GenericAPIView
from rest_framework import filters
from ynp_app.models import Task, Tag, User
from ynp_app.serializers import TaskListSerializer, TaskSingleSerializerGet, TaskCreateSerializer, TagSerializer, UserSerializer


def get_paginated_data(data, request):
    p = Paginator(data, 100)
    page = request.data.get('page', 1)
    page_object = p.page(page)
    return {
        "pagination": {
            "can_go_next": page_object.has_next(),
            "can_go_prev": page_object.has_previous(),
            "page": page,
            "per_page": 100,
            "total_items": p.count,
            "total_pages": p.num_pages
        },
        "data": page_object.object_list
    }


def index(request):
    return render(request, 'app_task_manager/index.html')


class TaskView(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer

    def get_queryset(self):
        request_filters = self.request.data.get('filters')
        filters = {}
        if request_filters:
            for f in request_filters:
                f_name = f['key']
                f_value = f['value']
                if type(f_value) == list:
                    key = f'{f_name}__id__in'
                elif f.get('strict'):
                    key = f_name
                else:
                    key = f'{f_name}__contains'

                filters[key] = f_value

        filtered_data = Task.objects.filter(**filters)

        request_sort = self.request.data.get('sort')
        if request_sort:
            filtered_data = filtered_data.order_by(request_sort['key'])

            if request_sort['value'] == 'asc':
                filtered_data = filtered_data.reverse()

        return filtered_data

    def post(self, request):
        serializer = self.serializer_class(self.get_queryset(), many=True)
        data = list(serializer.data)
        return Response(get_paginated_data(data, request))


class TaskViewCreate(CreateAPIView):
    serializer_class = TaskCreateSerializer


class SingleTaskView(RetrieveUpdateDestroyAPIView):
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
    search_fields = ['name']
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = (filters.SearchFilter,)


class UserView(ListAPIView):
    search_fields = ['name']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter,)


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

from django.shortcuts import render
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.db.models import F
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

per_page = 50

def get_paginated_data(data, request):
    p = Paginator(data, per_page)
    page = request.data.get('page', 1)
    page_object = p.page(page)
    return {
        "pagination": {
            "can_go_next": page_object.has_next(),
            "can_go_prev": page_object.has_previous(),
            "page": page,
            "per_page": per_page,
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
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name']

    def get_queryset(self):
        request_filters = self.request.data.get('filters')
        filters = {}
        search = self.request.query_params.get('search')
        if search:
            filters['name__contains'] = search
        if request_filters:
            for f in request_filters:
                f_name = f['key']
                f_value = f['value']
                if type(f_value) == list:
                    key = f'{f_name}__in'
                elif f.get('strict'):
                    key = f_name
                else:
                    key = f'{f_name}__contains'

                filters[key] = f_value

        filtered_data = Task.objects.filter(**filters).distinct()

        request_sort = self.request.data.get('sort')
        if request_sort:
            if request_sort['value'] == 'desc':
                filtered_data = filtered_data.order_by(F(request_sort['key']).desc(nulls_last=True))
            else:
                filtered_data = filtered_data.order_by(F(request_sort['key']).asc(nulls_last=True))

            # if request_sort['value'] == 'desc':
            #     filtered_data = filtered_data.reverse()

        return filtered_data

    def post(self, request):
        serializer = self.serializer_class(self.get_queryset(), many=True)
        data = list(serializer.data)
        return Response(get_paginated_data(data, request))

    def get(self, request):
        serializer = self.serializer_class(self.get_queryset(), many=True)
        data = list(serializer.data)
        p = Paginator(data, per_page=per_page)
        page_object = p.page(1)
        return Response(page_object.object_list)


class TaskViewCreate(CreateAPIView):
    serializer_class = TaskCreateSerializer

    def post(self, request):
        _data = request.data
        _data['author'] = str(request.user.id)
        serializer = TaskCreateSerializer(data=_data)
        if serializer.is_valid():
            serializer.save()
            read_serializer = TaskSingleSerializerGet(serializer.instance)
            return Response(read_serializer.data)

        return Response({
            "errors": serializer.error_messages
        }, status=400)


class SingleTaskView(RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSingleSerializerGet

    def patch(self, request, pk):
        task = self.get_object()
        serializer = TaskCreateSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            read_serializer = TaskSingleSerializerGet(task)
            return Response(read_serializer.data)
        return Response({
            "errors": serializer.error_messages
        }, status=400)


class SingleTaskLogTime(RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSingleSerializerGet

    def post(self, request, pk):
        task = get_object_or_404(pk=pk, queryset=self.queryset)
        time_spent = task.time_spent or 0
        time_spent = time_spent + float(request.data.get('value'))
        task.time_spent = time_spent
        task.save()

        serializer = TaskSingleSerializerGet(task)
        return Response(serializer.data)


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

    def patch(self, request):
        try:
            user_serializer = UserSerializer(request.user, data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(user_serializer.data)
            else:
                raise Exception()
        except Exception as e:
            return Response({"message": str(e)}, status=500)


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


def profile(request):
    try:
        user_serializer = UserSerializer(request.user)
        return JsonResponse(user_serializer.data)
    except Exception:
        return JsonResponse({"message": "Не удалось идентифицировать пользователя"}, status=500)

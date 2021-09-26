from django.urls import path, re_path
from . import routes
from . import views
from ynp_app.views import view_calculator, view_csv_editor, view_text_generator, view_task_manager, view_homepage

urlpatterns = [
    path('', view_homepage.index, name='index'),
    path(routes.ROUTE_APP_CALCULATOR['path'], view_calculator.index, name=routes.ROUTE_APP_CALCULATOR['name']),
    path('api/calculator/calculate', view_calculator.calculate),

    path(routes.ROUTE_APP_TEXT_GENERATOR['path'], view_text_generator.index, name=routes.ROUTE_APP_TEXT_GENERATOR['name']),
    path('api/text_generator/generate', view_text_generator.generate),

    path(routes.ROUTE_APP_CSV_EDITOR['path'], view_csv_editor.index, name=routes.ROUTE_APP_CSV_EDITOR['name']),
    path('api/csv_editor/import', view_csv_editor.import_file),
    path('api/csv_editor/getData', view_csv_editor.get_data),
    path('api/csv_editor/edit', view_csv_editor.edit),
    path('api/csv_editor/remove/<int:id>', view_csv_editor.remove),
    path('api/csv_editor/add/<int:id>', view_csv_editor.add),
    path('api/csv_editor/addColumn', view_csv_editor.add_column),
    path('api/csv_editor/createDocument', view_csv_editor.create_document),
    path('api/csv_editor/export', view_csv_editor.export),

    re_path(r'^app/task_manager/?.*/$', view_task_manager.index, name=routes.ROUTE_APP_TASK_MANAGER['name']),
    path('api/task_manager/task', view_task_manager.TaskView.as_view()),
    path('api/task_manager/task/create', view_task_manager.TaskViewCreate.as_view()),
    path('api/task_manager/task/<int:pk>', view_task_manager.SingleTaskView.as_view()),
    path('api/task_manager/task/<int:pk>/log', view_task_manager.SingleTaskLogTime.as_view()),
    path('api/task_manager/task/<int:pk>/tag/<int:tag_id>', view_task_manager.TaskTagView.as_view()),
    path('api/task_manager/tag', view_task_manager.TagView.as_view()),
    path('api/task_manager/user', view_task_manager.UserView.as_view()),

    path('api/profile', view_task_manager.profile)
]


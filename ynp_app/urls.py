from django.urls import path
from . import routes
from . import views
from ynp_app.controllers import controller_calculator, controller_text_generator, controller_csv_editor

urlpatterns = [
    path('', views.index, name='index'),
    path('app/calculator', controller_calculator.index, name=routes.ROUTE_APP_CALCULATOR['name']),
    path('api/calculator/calculate', controller_calculator.calculate),

    path('app/text_generator', controller_text_generator.index, name=routes.ROUTE_APP_TEXT_GENERATOR['name']),
    path('api/text_generator/generate', controller_text_generator.generate),

    path('app/csv_editor', controller_csv_editor.index, name=routes.ROUTE_APP_CSV_EDITOR['name']),
    path('api/csv_editor/import', controller_csv_editor.import_file),
    path('api/csv_editor/getData', controller_csv_editor.get_data),
    path('api/csv_editor/edit', controller_csv_editor.edit),
    path('api/csv_editor/remove/<int:id>', controller_csv_editor.remove),
    path('api/csv_editor/add/<int:id>', controller_csv_editor.add),
    path('api/csv_editor/addColumn', controller_csv_editor.add_column),
    path('api/csv_editor/createDocument', controller_csv_editor.create_document),
    path('api/csv_editor/export', controller_csv_editor.export),
]
from django.urls import path
from . import routes
from . import views
from . import controller_calculator

urlpatterns = [
    path('', views.index, name='index'),
    path('app/calculator', controller_calculator.index, name=routes.ROUTE_APP_CALCULATOR['name']),
    path('api/calculator/calculate', controller_calculator.calculate),
]
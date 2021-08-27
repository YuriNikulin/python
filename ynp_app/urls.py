from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('app/calculator', views.calculator, name='app_calculator'),
]
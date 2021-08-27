from django.http import HttpResponse
from django.shortcuts import render



def index(request):
    return render(request, 'homepage/index.html', context={
        'foo': 'bar'
    })

def calculator(request):
    return render(request, 'app_calculator/index.html', context={
        'foo': 'bar'
    })

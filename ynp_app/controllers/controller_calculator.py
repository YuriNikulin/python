import json

from django.http import HttpResponse
from django.http.response import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from ynp_app.applications.calculator import main


def index(request):
    return render(request, 'app_calculator/index.html', context={
        'foo': 'bar'
    })

def calculate(request):
    response_data = 0
    value = request.GET.get('value')
    try:
        result = main(value)
        return HttpResponse(result)
    except Exception as e:
        res = HttpResponseBadRequest(json.dumps({
            "message": 'Некорректный формат данных'
        }))

        return res

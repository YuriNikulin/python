import json
from os import path
from django.http.response import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render

def index(request):
    return render(request, 'app_csv_editor/index.html')
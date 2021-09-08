import json
from os import path
from django.http.response import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
import ynp_app.applications.csv as csv_app

def index(request):
    return render(request, 'app_csv_editor/index.html')


def import_file(request):
    file = request.FILES['file']
    extension = path.splitext(file.name)[1]
    if extension != '.xlsx' and extension != '.xls' and extension != '.csv':
        error = HttpResponseBadRequest(json.dumps({
            "message": f"Файлы с расширением {extension} не поддерживаются. Поддерживаемые расширения: .xlsx, .xls, .csv"
        }))
        return error

    res = csv_app.read_file(file)
    return JsonResponse(res)


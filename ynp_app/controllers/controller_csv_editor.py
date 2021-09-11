import json
import math
from os import path
from django.http.response import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
import ynp_app.applications.csv as csv_app

def extend_pagination(_pagination):
    pagination = _pagination
    pagination["can_go_next"] = pagination["page"] * pagination["per_page"] + pagination["per_page"] < pagination["total_items"]
    pagination["can_go_prev"] = pagination["page"] > 1
    pagination["total_pages"] = math.ceil(pagination["total_items"] / pagination["per_page"])
    return pagination

def index(request):
    return render(request, 'app_csv_editor/index.html')


def import_file(request):
    user = request.user
    file = request.FILES['file']
    extension = path.splitext(file.name)[1]
    if extension != '.xlsx' and extension != '.xls' and extension != '.csv':
        error = HttpResponseBadRequest(json.dumps({
            "message": f"Файлы с расширением {extension} не поддерживаются. Поддерживаемые расширения: .xlsx, .xls, .csv"
        }))
        return error

    res = csv_app.read_file(file, keep_index=request.GET.get("keep_index"))
    pagination = res["pagination"]
    pagination = extend_pagination(pagination)
    user.current_document = {
        'data': {
            'keys': res['data']['keys'],
            'values': res['original_values']
        },
        'pagination': res['pagination']
    }
    user.save()
    return JsonResponse({
        'data': res['data'],
        'pagination': res['pagination']
    })

def get_data(request):
    user = request.user
    if not user:
        error = HttpResponseBadRequest(json.dumps({
            "message": f"Пользователь не найден"
        }))
        return error

    body = json.loads(request.body.decode())
    current_document = user.current_document
    if not current_document:
        return JsonResponse({
            "data": {
                "values": [],
                "keys": []
            },
            "pagination": {
                "total_items": 0
            }
        })
    res = csv_app.get_data(current_document, page=body.get('page'))
    pagination = res["pagination"]
    pagination = extend_pagination(pagination)
    return JsonResponse(res)


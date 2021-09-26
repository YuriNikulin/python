import json
import math
from os import path, remove as os_remove
from django.http.response import HttpResponseBadRequest, JsonResponse, HttpResponse, FileResponse
from django.shortcuts import render
import ynp_app.applications.csv as csv_app


def get_user_and_document(request, allow_empty_document=False):
    user = None
    current_document = None
    user = request.user
    if not user:
        error = ValueError("Пользователь не найден")
        raise error

    current_document = user.current_document
    if not allow_empty_document and not current_document:
        error = ValueError("Документ пользователя не найден")
        raise error

    return user, current_document


def generate_json_to_save_in_db(res):
    return {
        'data': {
            'keys': res['data']['keys'],
            'values': res['original_values']
        }
    }


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
    user.current_document = generate_json_to_save_in_db(res)
    user.save()
    return JsonResponse({
        'data': res['data'],
        'pagination': res['pagination']
    })

def get_data(request):
    try:
        [user, current_document] = get_user_and_document(request, allow_empty_document=True)
        body = json.loads(request.body.decode())
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

        res = csv_app.get_data(
            current_document,
            page=body.get('page'),
            sort=body.get('sort'),
            filters=body.get('filters'),
            columns=body.get('columns')
        )
        del res['original_values']
        pagination = res["pagination"]
        pagination = extend_pagination(pagination)
    except Exception as e:
        return HttpResponseBadRequest(json.dumps({
            'message': str(e)
        }))
    return JsonResponse(res)

def edit(request):
    try:
        [user, current_document] = get_user_and_document(request)
        body = json.loads(request.body.decode())
        res = csv_app.edit(item_id=body['id'], col_index=body['columnIndex'], new_value=body['value'], user_document=current_document)
        user.current_document = generate_json_to_save_in_db(res)
        user.save()
        return JsonResponse({})
    except Exception as e:
        return HttpResponseBadRequest(json.dumps({
            "message": str(e)
        }))


def remove(request, id):
    try:
        [user, current_document] = get_user_and_document(request)
        res = csv_app.remove(item_id=id, user_document=current_document)
        user.current_document = generate_json_to_save_in_db(res)
        user.save()
        return JsonResponse({})
    except Exception as e:
        error = HttpResponseBadRequest(json.dumps({
            "message": str(e)
        }))
        return error

def add(request, id):
    try:
        [user, current_document] = get_user_and_document(request)
        res = csv_app.add(item_id=id, user_document=current_document)
        user.current_document = generate_json_to_save_in_db(res['data'])
        user.save()
        return HttpResponse(res['new_item_id'])
    except Exception as e:
        error = HttpResponseBadRequest(json.dumps({
            "message": str(e)
        }))
        return error

def add_column(request):
    try:
        [user, current_document] = get_user_and_document(request)
        body = json.loads(request.body.decode())
        res = csv_app.add_column(column=body.get('column'), user_document=current_document)
        user.current_document = generate_json_to_save_in_db(res)
        user.save()
        return JsonResponse({})
    except Exception as e:
        error = HttpResponseBadRequest(json.dumps({
            "message": str(e)
        }))
        return error

def create_document(request):
    try:
        [user, *rest] = get_user_and_document(request, allow_empty_document=True)
        res = csv_app.create_document()

        user.current_document = generate_json_to_save_in_db(res)
        user.save()
        return JsonResponse({})
    except Exception as e:
        error = HttpResponseBadRequest(json.dumps({
            "message": str(e)
        }))
        return error

def export(request):
    try:
        [user, current_document] = get_user_and_document(request)
        body = json.loads(request.body.decode())
        filename = csv_app.export(
            current_document,
            sort=body.get('sort'),
            filters=body.get('filters'),
            columns=body.get('columns'),
            format=request.GET.get('format')
        )
        file = open(filename, 'rb')
        os_remove(filename)

        return FileResponse(file)
    except Exception as e:
        error = HttpResponseBadRequest(json.dumps({
            "message": str(e)
        }))
        return error

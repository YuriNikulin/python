import json
from os import path
from django.http.response import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from ynp_app.applications.text_generator import main
from codecs import EncodedFile
from datetime import datetime
import pathlib

file_max_size_kb = 200


example_files = [
            {
                'id': '1',
                'name': '"Обитаемый остров" (Братья Стругацкие)',
                'filename': 'media/os.txt'
            },
            {
                'id': '2',
                'name': '"Война и Мир" (Л. Толстой)"',
                'filename': 'media/voyna_i_mir.txt'
            },
            {
                'id': '3',
                'name': '"One Hundred Years of Solitude" (Gabriel Garcia)',
                'filename': 'media/ohyos.txt'
            },
        ]

def index(request):
    return render(request, 'app_text_generator/index.html', {
        'examples_files': example_files
    })

def generate(request):
    try:
        response = None
        generate_type = request.GET.get('type')
        filename = f'./file{datetime.now().timestamp()}.txt'
        text_string = None
        result = ''
        if (generate_type == 'file'):
            file = request.FILES['file']
            file_size  = file.size / 1000
            if file_size > file_max_size_kb:
                raise ValueError(f'Слишком большой файл. Макс. размер файла - {file_max_size_kb}кб.')
            text_string = file.read().decode()
        elif generate_type == 'text':
            text_string = json.loads(request.body.decode()).get('text')
        else:
            example_id = request.GET.get('exampleId')
            example_obj = next(x for x in example_files if x['id'] == example_id)
            example_filename = path.abspath(pathlib.Path(__file__).parent.resolve() / example_obj['filename'])
            with open(f'{example_filename}', 'r') as file:
                text_string = file.read()

        result = main(text=text_string, sequences_count=int(request.GET.get('sequencesCount', 10)))
        return JsonResponse({
            "result": result
        })
    except Exception as e:
        return HttpResponseBadRequest(json.dumps({
            "message": str(e)
        }))

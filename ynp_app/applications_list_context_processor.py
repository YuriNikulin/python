from django import urls
from . import routes

applications_list = [
            {
                "id": "calculator",
                "name": "Калькулятор",
                "path": routes.ROUTE_APP_CALCULATOR['path'],
                "description": "\
                    Простой калькулятор, умеющий выполнять простые арифметические действия:\
                    сложение, вычитание, умножение, деление. Понимает скобки. Не использует eval.\
                ",
                "bg_img_src": 'homepage/img/app_calculator.jpg',
                "app_name": routes.ROUTE_APP_CALCULATOR['name'],
                "sources": [
                    {
                        "name": "Логика",
                        "url": "https://github.com/YuriNikulin/python/blob/master/ynp_app/applications/calculator.py"
                    },
                    {
                        "name": "View",
                        "url": "https://github.com/YuriNikulin/python/blob/master/ynp_app/views/view_calculator.py"
                    }
                ]
            },
            {
                "id": "text_generator",
                "name": "Генератор случайного текста",
                "path": routes.ROUTE_APP_TEXT_GENERATOR['path'],
                "description": "\
                    Приложение умеет генерировать псевдослучайный текст на основе введённого текста.\
                ",
                "bg_img_src": 'homepage/img/app_text_generator.jpg',
                "app_name": routes.ROUTE_APP_TEXT_GENERATOR['name'],
                "technologies": [
                    {
                        "name": 'nltk'
                    }
                ],
                "sources": [
                    {
                        "name": "Логика",
                        "url": "https://github.com/YuriNikulin/python/blob/master/ynp_app/applications/text_generator.py"
                    },
                    {
                        "name": "View",
                        "url": "https://github.com/YuriNikulin/python/blob/master/ynp_app/views/view_text_generator.py"
                    }
                ]
            },
            {
                "id": "csv_editor",
                "name": "CSV/XML - редактор",
                "path": routes.ROUTE_APP_CSV_EDITOR['path'],
                "description": "\
                    С помощью приложения можно создавать и редактировать XLS и CSV документы.\
                ",
                "sources": [
                    {
                        "name": "Логика",
                        "url": "https://github.com/YuriNikulin/python/blob/master/ynp_app/applications/csv.py"
                    },
                    {
                        "name": "View",
                        "url": "https://github.com/YuriNikulin/python/blob/master/ynp_app/views/view_csv_editor.py"
                    }
                ],
                "bg_img_src": 'homepage/img/app_csv_editor.jpg',
                "app_name": routes.ROUTE_APP_CSV_EDITOR['name'],
                "technologies": [
                    {
                        "name": 'pandas'
                    }
                ]
            },
            {
                "id": "task_tracker",
                "name": "Таск-трекер",
                "path": routes.ROUTE_APP_TASK_MANAGER['path'],
                "description": "В приложении реализован базовый функционал таск-трекера.",
                "sources": [
                    {
                        "name": "View",
                        "url": "https://github.com/YuriNikulin/python/blob/master/ynp_app/views/view_task_manager.py"
                    }
                ],
                "technologies": [
                    {
                        "name": "django rest framework"
                    }
                ],
                "bg_img_src": 'homepage/img/app_task_tracker.png',
                "app_name": routes.ROUTE_APP_TASK_MANAGER['name'],
            }
        ]


def applications(request):
    current_application = None
    try:
        current_application = next(x for x in applications_list if x['path'] in request.path)
    except Exception:
        pass

    return {
        'applications_list': applications_list,
        'current_application': current_application
    }

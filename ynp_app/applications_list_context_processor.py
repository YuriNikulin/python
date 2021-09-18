from django import urls
from . import routes


def applications_list(request):
    return {
        'applications_list': [
            {
                "id": "calculator",
                "name": "Калькулятор",
                "description": "\
                    Простой калькулятор, умеющий выполнять простые арифметические действия:\
                    сложение, вычитание, умножение, деление. Понимает скобки. Не использует eval.\
                ",
                "bg_img_src": 'homepage/img/app_calculator.jpg',
                "app_name": routes.ROUTE_APP_CALCULATOR['name'],
                "source_link": "https://github.com/YuriNikulin/python/blob/master/ynp_app/applications/calculator.py"
            },
            {
                "id": "text_generator",
                "name": "Генератор случайного текста",
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
                "source_link": "https://github.com/YuriNikulin/python/blob/master/ynp_app/applications/text_generator.py"
            },
            {
                "id": "csv_editor",
                "name": "CSV/XML - редактор",
                "description": "\
                    С помощью приложения можно создавать и редактировать XLS и CSV документы.\
                ",
                "source_link": "https://github.com/YuriNikulin/python/blob/master/ynp_app/applications/csv.py",
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
                "description": "В приложении реализован базовый функционал таск-трекера.",
                "technologies": [
                    {
                        "name": "django rest framework"
                    }
                ],
                "bg_img_src": 'homepage/img/app_task_tracker.png',
                "app_name": routes.ROUTE_APP_TASK_MANAGER['name'],
            }
        ],
    }
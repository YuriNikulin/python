Это проект портфолио, его предназначение - продемонстрировать мои способности в Python-разработке.
Проект доступен по ссылке:

<h2>https://www.pythony.ru/</h2>

<h3>Локальный запуск:</h3>

1. Склонировать репозиторий:
```sh
git clone https://github.com/YuriNikulin/python.git
```

2. Перейти в корневую папку проекта:
```sh
cd python
```

3. Установить python зависимости:
```sh
pip install -r requirements.txt
```

4. Настроить соединение с БД в ynp/settings.py:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '', // название бд
        'USER': '', // имя пользователя бд
        'PASSWORD': '', // пароль от бд
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```

5. Накатить миграции:

```sh
python3 manage.py migrate
```

6. Перейти в папку с фронтендом, установить фронтовые зависимости и собрать фронт:

```sh
cd frontend
npm install
npm run build
```

7. Вернуться в корневую папку и собрать картинки в папку со статикой:

```sh
cd ..
python3 custom_scripts.py collect_images
```

8. Запустить django сервер:

```sh
python3 manage.py runserver
```

9. Если нужно править фронт, можно также отдельно запустить вебпак-сервер, чтобы не пересобирать каждое изменение вручную:
```sh
cd frontend
npm start
```

10. Приложение должно быть доступно в браузере по адресу:

http://localhost:8000/

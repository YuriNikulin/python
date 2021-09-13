from datetime import datetime
from dateutil.relativedelta import relativedelta
from ynp_app.models import User
from django.utils.deprecation import MiddlewareMixin

cookie_user_key = 'ynp_user'

def create_new_user():
    user = User.create()
    user.save()
    return user


class UsersMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, *args, **kwargs):
        user = None
        user_id = request.COOKIES.get(cookie_user_key)
        if not user_id:
            user = create_new_user()
        else:
            user = User.objects.filter(pk=user_id).first()
            if not user:
                user = create_new_user()

        request.user = user
        if user_id != str(user.id):
            request.should_set_user_cookie = True
            # expiration_date = datetime.today() + relativedelta(months=6)
            # response.set_cookie(cookie_user_key, user.id, expires=expiration_date, httponly=True)

        return None

    def process_response(self, request, response):
        if getattr(request, 'should_set_user_cookie', False):
            user = request.user
            expiration_date = datetime.today() + relativedelta(months=6)
            response.set_cookie(cookie_user_key, user.id, expires=expiration_date, httponly=True)
        return response

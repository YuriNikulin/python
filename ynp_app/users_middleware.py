from datetime import datetime
from dateutil.relativedelta import relativedelta

cookie_user_key = 'ynp_user'
from ynp_app.models import User

def create_new_user():
    user = User.create()
    user.save()
    return user


class UsersMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
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
            expiration_date = datetime.today() + relativedelta(months=6)
            response.set_cookie(cookie_user_key, user.id, expires=expiration_date, httponly=True)

        return None

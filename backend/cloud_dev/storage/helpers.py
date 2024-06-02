import sys
from django.core.cache import cache

from authentication.models import User


def get_user(request):
    access_token = request.COOKIES.get("access_token")
    user_data = cache.get(access_token)
    user = User.objects.get(id=user_data['user_id'])
    return user


def format_filepath(instance):
    path = [(instance.id, instance.name)]
    current = instance.parent
    while current:
        path.append((current.id, current.name))
        current = current.parent
    return path[::-1]
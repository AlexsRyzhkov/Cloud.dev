import time

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.core.cache import cache
from django.conf import settings

from .models import User
from .jwts import create_access_token, create_refresh_token, get_jwt_payload
from .serializers import UserRegisterSerializer, UserLoginSerializer

access_token_lifetime = settings.JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()
refresh_token_lifetime = settings.JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()


class RegisterView(APIView):
    """
    View для регистрации.
    Поддерживает POST запросы.
    Доступен по адресу /api/auth/register
    """
    def post(self, request):
        """
        Регистрирует пользователя :model:`authentication.User`
        """

        # Валидация логина и пароля
        serializer = UserRegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Создание пользователя
        user = serializer.save()
        message = {'message': 'Пользователь создан успешно', 'user_id': user.id}
        return Response(message, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    View для входа.
    Поддерживает POST запросы.
    Доступен по адресу /api/auth/login
    """
    def post(self, request):
        """
        Возвращает данные пользователя :model:`authentication.User`
        при успешной попытке входа.

        :param request: JSON с ключами 'email' и 'password'.

        :returns: Данные пользователя или ошибка.
        """

        # Валидация логина и пароля
        serializer = UserLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Аутентификация пользователя
        user = authenticate(**serializer.data)
        if user is None:
            message = {"message": "Неверный логин или пароль"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        # Создания access и refresh токенов
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        # Кэширование access токена
        user_data = {
            "user_id": user.id,
            "role": user.role,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
        cache.set(access_token, user_data, access_token_lifetime)

        # Формирование ответа и установка куков
        response = Response(user_data, status=status.HTTP_201_CREATED)
        response.set_cookie('access_token', access_token, httponly=True, expires=access_token_lifetime)
        response.set_cookie('refresh_token', refresh_token, httponly=True, expires=refresh_token_lifetime)

        return response


class RefreshTokenView(APIView):
    """
    View для обновления токенов.
    Поддерживает GET запросы.
    Доступен по адресу /api/auth/refresh
    """
    def get(self, request):
        """
        Возвращает данные пользователя :model:`authentication.User`
        при успешной валидации refresh токена.

        :param request: GET запрос с установленным 'refresh_token' cookie

        :returns: Данные пользователя или ошибка.
        """
        token = request.COOKIES.get('refresh_token')
        # Токен существует
        if token is None:
            message = {"message": "Токен не найден"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        # Токен валиден
        try:
            payload = get_jwt_payload(token)
        except Exception as e:
            message = {"message": "Некорректный токен, " + str(e)}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        # Пользователь соответствующий токену существует
        try:
            user = User.objects.get(pk=payload["user_id"])
        except Exception as e:
            message = {"message": "Пользователь не существует" + str(e)}
            return Response(message, status=status.HTTP_404_NOT_FOUND)

        # Получен refresh токен
        if payload["token_type"] != "refresh":
            message = {"message": "Неверный тип токена"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        # Поиск токена в черном списке
        if cache.has_key(token):
            message = {"message": "Токен не действителен"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        # Создание новой пары токенов
        access_token = create_access_token(payload["user_id"])
        refresh_token = create_refresh_token(payload["user_id"])

        # Внесение старого refresh токена в черный список
        refresh_token_lifetime = payload["exp"] - time.time()
        cache.set(token, payload["user_id"], refresh_token_lifetime)

        # Кэширование access токена
        user_data = {
            "user_id": user.id,
            "role": user.role,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
        cache.set(access_token, user_data, access_token_lifetime)

        # Формирование ответа и установка куков
        response = Response(user_data, status=status.HTTP_201_CREATED)
        response.set_cookie('access_token', access_token, httponly=True, expires=access_token_lifetime)
        response.set_cookie('refresh_token', refresh_token, httponly=True, expires=refresh_token_lifetime)

        return response

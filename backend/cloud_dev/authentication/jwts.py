import jwt
from datetime import datetime, timezone
from django.conf import settings

KEY = settings.JWT["SIGNING_KEY"]
ALGORITHM = settings.JWT["ALGORITHM"]
ACCESS_TOKEN_LIFETIME = settings.JWT["ACCESS_TOKEN_LIFETIME"]
REFRESH_TOKEN_LIFETIME = settings.JWT["REFRESH_TOKEN_LIFETIME"]


def create_access_token(user_id):
    """
    Создает access токен для пользователя с user_id.
    Срок действия settings.JWT["ACCESS_TOKEN_LIFETIME"].

    :param int user_id: Идентификатор пользователя

    :returns: access токен для пользователя

    :rtype: str
    """
    payload = {
        "token_type": "access",
        "exp": datetime.now(tz=timezone.utc) + ACCESS_TOKEN_LIFETIME,
        "iat": datetime.now(tz=timezone.utc),
    }
    payload["user_id"] = user_id
    token = jwt.encode(payload, KEY, algorithm=ALGORITHM)
    return token


def create_refresh_token(user_id):
    """
    Создает refresh токен для пользователя с user_id.
    Срок действия settings.JWT["REFRESH_TOKEN_LIFETIME"].

    :param int user_id: Идентификатор пользователя

    :returns: refresh токен для пользователя

    :rtype: str
    """
    payload = {
        "token_type": "refresh",
        "exp": datetime.now(tz=timezone.utc) + REFRESH_TOKEN_LIFETIME,
        "iat": datetime.now(tz=timezone.utc),
    }
    payload["user_id"] = user_id
    token = jwt.encode(payload, KEY, ALGORITHM)
    return token


def get_jwt_payload(token):
    """
    Расшифровывает переданный токен.

    :param str token: Access/refresh токен

    :returns: Информация из токена (тип, время экспирации и создания)

    :rtype: dict
    """
    payload = jwt.decode(token, KEY, algorithms=[ALGORITHM])
    return payload

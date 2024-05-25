import random

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


def generate_random_color():
    return '#' + ''.join([random.choice('0123456789abcdef') for _ in range(6)])


class UserManager(BaseUserManager):
    """
    Менеджер работы с сущностями `authentication.model.User`.
    """
    def create_user(self, login, password=None, **extra_fields):
        """
        Создает пользователя с переданными параметрами

        :param str email: Адрес электронной почты пользователя
        :param str password: Пароль пользователя

        :returns: Пользователь с установленными логином и хэшированным паролем

        :rtype: `authentication.models.User`
        """
        if not login:
            raise ValueError("Адрес электронной почты не может быть пустым")
        email = self.normalize_email(login)
        user = self.model(login=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, login, password=None, **extra_fields):
        """
        Создает супер-пользователя с переданными параметрами

        :param str email: Адрес электронной почты пользователя
        :param str password: Пароль пользователя

        :returns: Пользователь с установленными логином и хэшированным паролем и правами супер-пользователя.

        :rtype: `authentication.models.User`
        """
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(login, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Хранит данные одного пользователя.

    :param id: :class:`django.db.models.BigAutoField` Идентификатор пользователя (Первичный ключ)
    :param email: :class:`django.db.models.EmailField` Адрес электронной почты пользователя (Уникальное поле).
    :param password: Пароль пользователя хэшированный с помощью SHA256.
    :param first_name: :class:`django.db.models.TextField` Имя пользователя.
    :param last_name: :class:`django.db.models.TextField` Фамилия пользователя.
    :param role: Роль (0 - Администратор, 1 - Пользователь).
    :param is_superuser: Обладает ли правами супер-пользователь
    :param last_login: Время последнего входа.
    :param is_staff: Является ли пользователь сотрудником (системное поле).
    :param is_active: Является ли аккаунт пользователя активным (системное поле).
    """
    class _Roles(models.IntegerChoices):
        ADMIN = 0, "Admin"
        USER = 1, "User"

    login = models.EmailField(unique=True,
                              error_messages={
                                  "login": "Введите адрес электронной почты",
                                  "unique": "Пользователь с таким логином уже существует",
                              })
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.IntegerField(choices=_Roles, default=_Roles.USER, blank=True, null=True)
    color = models.CharField(default=generate_random_color, max_length=7)
    # TO DO
    # profile_picture = models.ForeignKey('cloud.File', models.DO_NOTHING)

    # Поля для Django
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.login

    @property
    def full_name(self):
        """
        Возвращает полное имя Пользователя.
        """
        return f"{self.first_name}{' ' + self.last_name if self.last_name else ''}"

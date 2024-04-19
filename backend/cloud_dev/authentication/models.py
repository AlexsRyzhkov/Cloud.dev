from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    """
    Менеджер работы с сущностями :model:`authentication.User`.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Создает пользователя с переданными параметрами

        :param str email: Адрес электронной почты пользователя
        :param str password: Пароль пользователя

        :returns: Пользователь с установленными логином и захэшированнным паролем

        :rtype: :model:`authentication.User`
        """
        if not email:
            raise ValueError("Адрес электронной почты не может быть пустым")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Создает супер-пользователя с переданными параметрами

        :param str email: Адрес электронной почты пользователя
        :param str password: Пароль пользователя

        :returns: Пользователь с установленными логином и хэшированным паролем
        и правами супер-пользователя.

        :rtype: :model:`authentication.User`
        """
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Хранит данные одного пользователя.

    Включает:
    email - Адрес электронной почты пользователя (Уникальное поле).
    first_name - Имя пользователя.
    last_name - Фамилия пользователя.
    role - Роль (0 - Администратор, 1 - Пользователь).
    """
    class Roles(models.IntegerChoices):
        ADMIN = 0, "Admin"
        USER = 1, "User"

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.IntegerField(choices=Roles, default=Roles.USER)
    # TO DO
    # profile_picture = models.ForeignKey('cloud.File', models.DO_NOTHING)

    # Поля для Django
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        """
        Возвращает полное имя Пользователя.
        """
        return f"{self.first_name}{' ' + self.last_name if self.last_name else ''}"

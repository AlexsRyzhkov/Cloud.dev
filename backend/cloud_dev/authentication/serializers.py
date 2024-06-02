from rest_framework import serializers
from .models import User
from storage.models import FileSystemElement, Permission


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Сериалайзер регистрации пользователя.

    Выполняет валидацию полей для модели пользователя `authentication.models.User`.
    """

    class Meta:
        model = User
        fields = ('id', 'login', 'password', 'first_name', 'last_name', 'role', 'root_dir')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        """
        Создает пользователя с валидированными данными.
        """

        user = User.objects.create(
            login=validated_data['login'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
        )

        user.set_password(validated_data['password'])

        file_system_element = FileSystemElement.objects.create(
            name=f'user{user.id}',
            is_dir=True,
            filepath=f'user{user.id}',
        )
        Permission.objects.create(
            user=user,
            file=file_system_element,
            read=True,
            write=True,
        )
        user.root_dir = file_system_element
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    """
    Сериалайзер логина пользователя.

    Используется для валидации логина и пароля.
    """
    login = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class RefreshTokenSerializer(serializers.Serializer):
    """
    Сериалайзер refresh токена.
    """
    token = serializers.CharField(required=True)

from rest_framework import serializers
from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Сериалайзер регистрации пользователя.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'role') # Add profile_picture
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        """
        Создает пользователя с валидированными данными.
        """
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
            #profile_picture=validated_data['profile_picture']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    """
    Сериалайзер логина пользователя.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class RefreshTokenSerializer(serializers.Serializer):
    """
    Сериалайзер refresh токена.
    """
    token = serializers.CharField(required=True)
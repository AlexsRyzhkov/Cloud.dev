import os.path
import shutil
import sys
import time

from django.http import FileResponse
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.core.cache import cache
from django.conf import settings

from .helpers import format_filepath, get_user
from .models import Drive, FileSystemElement, Permission
from .renderers import PassthroughRenderer
from .serializers import DriveSerializer, FileSystemElementSerializer


def ownership_required(view_func):
    def wrapper(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access_token')

        if access_token is None or not cache.has_key(access_token):
            message = {"message": "Token is invalid"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        return view_func(self, request, *args, **kwargs)

    return wrapper


def permission_required(read=False, write=False):
    def permission_decorator(view_func):
        def wrapper(self, request, pk, *args, **kwargs):
            access_token = request.COOKIES.get('access_token')

            if access_token is None or not cache.has_key(access_token):
                message = {"message": "Token is invalid"}
                return Response(message, status=status.HTTP_401_UNAUTHORIZED)

            user_data = cache.get(access_token)
            try:
                permission = Permission.objects.get(user__id=user_data['user_id'], file__id=pk)
                if (read and not permission.read) or (write and not permission.write):
                    raise Exception()
            except Exception:
                message = {"message": "Unauthorized"}
                return Response(message, status=status.HTTP_401_UNAUTHORIZED)

            return view_func(self, request, pk, *args, **kwargs)

        return wrapper

    return permission_decorator


# Create your views here.
class DriveView(APIView):
    @ownership_required
    def get(self, request):
        access_token = request.COOKIES.get('access_token')
        user_data = cache.get(access_token)

        drive = Drive.objects.get(user=user_data['user_id'])
        serializer = DriveSerializer(drive)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DirectoryView(APIView):
    @permission_required(read=True)
    def get(self, request, pk):
        file_system_element = FileSystemElement.objects.get(id=pk)
        filepath = format_filepath(file_system_element)
        children = FileSystemElement.objects.filter(parent__id=pk)
        serializer = FileSystemElementSerializer(children, many=True)

        message = {
            "filepath": filepath,
            "children": serializer.data,
        }
        return Response(message, status=status.HTTP_200_OK)

    @permission_required(read=True, write=True)
    def post(self, request, pk):
        serializer = FileSystemElementSerializer(data=request.data)
        if not serializer.is_valid():
            message = {"message": serializer.errors}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        if 'file' in serializer.validated_data:
            name, ext = os.path.splitext(str(serializer.validated_data['file']))
            serializer.validated_data['extension'] = ext
        serializer.save()

        user = get_user(request)
        file_system_element = FileSystemElement.objects.get(id=serializer.data['id'])
        permission = Permission(
            user=user,
            file=file_system_element,
            read=True,
            write=True,
        )
        permission.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @permission_required(read=True, write=True)
    def patch(self, request, pk):
        try:
            file = FileSystemElement.objects.get(id=pk)
        except:
            file = None

        if not file:
            message = {"message": "Файл не найден"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = FileSystemElementSerializer(file, data=request.data, partial=True)
        if not serializer.is_valid():
            message = {"message": "Некорректные данные"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_required(read=True, write=True)
    def delete(self, request, pk):
        try:
            file = FileSystemElement.objects.get(id=pk)
        except:
            file = None

        if not file:
            message = {"message": "Файл не найден"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        if file.parent is None:
            message = {"message": "Невозможно удалить корневую папку пользователя"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        file.delete()
        message = {"message": "Файл удален"}
        return Response(message, status=status.HTTP_200_OK)


class DownloadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FileSystemElement.objects.all()

    @action(methods=['get'], detail=True, renderer_classes=(PassthroughRenderer,))
    def download(self, *args, **kwargs):
        # pk получаем в качестве kwarg
        instance = self.get_object()

        if not instance.file:
            media_path = settings.MEDIA_ROOT / 'drives'
            full_path = media_path / instance.filepath
            output_path = media_path / instance.name
            fn = shutil.make_archive(output_path, 'zip', full_path)
            print(fn, file=sys.stderr)
            size = os.path.getsize(fn)
            ext = '.zip'
            file_handle = open(fn, 'rb')
        else:
            # Открытие файла модели
            size = instance.file.size
            ext = instance.extension
            file_handle = instance.file.open()

        # Отправка файла
        response = FileResponse(file_handle, content_type='attachment')
        response['Content-Length'] = size
        response['Content-Disposition'] = 'attachment; filename="%s"' % (instance.name + ext)

        return response

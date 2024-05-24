import sys

from rest_framework import serializers
from .models import FileSystemElement, Drive


class FileSystemElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSystemElement
        fields = ['id', 'file', 'parent', 'name', 'extension', 'is_dir']

    def create(self, validated_data):
        parent_id = validated_data['parent']
        print(parent_id.id, file=sys.stderr)
        parent = FileSystemElement.objects.get(id=parent_id.id)
        validated_data['level'] = parent.level + 1
        validated_data['filepath'] = parent.filepath + '/' + validated_data['name']
        file_system_element = FileSystemElement.objects.create(**validated_data)
        file_system_element.save()

        return file_system_element


class DriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drive
        fields = '__all__'

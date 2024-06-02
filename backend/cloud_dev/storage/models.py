import os.path
import sys

from django.db import models
from django.conf import settings
from django_cleanup import cleanup

DEFAULT_DRIVE_SIZE = settings.DEFAULT_DRIVE_SIZE


def build_file_path(instance, filename):
    return "drives/{0}/{1}".format(instance.parent.filepath, filename)


@cleanup.select
class FileSystemElement(models.Model):
    file = models.FileField(upload_to=build_file_path, blank=True, null=True)
    parent = models.ForeignKey('FileSystemElement', models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=150)
    extension = models.CharField(default='', max_length=15, blank=True, null=True)
    level = models.IntegerField(default=0)
    filepath = models.CharField()
    is_dir = models.BooleanField(default=False)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class DriveManager(models.Manager):
    def create(self, user, **extra_fields):
        drive = self.model(user=user, **extra_fields)
        drive.save()
        return drive


class Drive(models.Model):
    user = models.ForeignKey('authentication.User', models.CASCADE)
    max_size = models.IntegerField(default=DEFAULT_DRIVE_SIZE)
    free_size = models.IntegerField(default=DEFAULT_DRIVE_SIZE)
    pdf_count = models.IntegerField(default=0)
    doc_count = models.IntegerField(default=0)
    img_count = models.IntegerField(default=0)

    objects = DriveManager()

    def __str__(self):
        return f'Drive {self.user}'


class Permission(models.Model):
    user = models.ForeignKey('authentication.User', models.CASCADE)
    file = models.ForeignKey('FileSystemElement', models.CASCADE)
    read = models.BooleanField(default=True)
    write = models.BooleanField(default=False)

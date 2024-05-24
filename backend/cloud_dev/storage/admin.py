from django.contrib import admin
from .models import FileSystemElement, Drive, Permission

# Register your models here.
admin.site.register(Drive)
admin.site.register(FileSystemElement)
admin.site.register(Permission)

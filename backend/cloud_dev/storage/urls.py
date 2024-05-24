from django.urls import path
from . import views


urlpatterns = [
    path("drive/", views.DriveView.as_view(), name="drive"),
    path("dir/<int:pk>/", views.DirectoryView.as_view(), name="directory"),
    path("dir/<int:pk>/download", views.DownloadViewSet.as_view({'get': 'download'}), name="download"),
]

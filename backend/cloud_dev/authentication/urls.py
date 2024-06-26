from django.urls import path
from . import views


urlpatterns = [
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("refresh/", views.RefreshTokenView.as_view(), name="refresh_token"),
    path("user/", views.UserInfoView.as_view(), name="user"),
    path("logout/", views.Logout.as_view(), name="logout"),
]

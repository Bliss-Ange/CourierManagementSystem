from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
] 
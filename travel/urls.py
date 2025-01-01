from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="travel"),
    path('create_spot', views.create_spot, name='create_spot')
]
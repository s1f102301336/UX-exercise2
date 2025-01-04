from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="travel"),
    path('get_all_data', views.get_all_data, name="get_all_data"),
    path('create_spot', views.create_spot, name='create_spot'),
    path('detail/<int:spot_id>', views.detail, name='detail')
]
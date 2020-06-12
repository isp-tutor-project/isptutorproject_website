from django.urls import path
from . import views

urlpatterns = [
    path('class/edit/', views.editClass),
    path('class/view/', views.viewClass),
    path('edit/', views.teacheredit),
]
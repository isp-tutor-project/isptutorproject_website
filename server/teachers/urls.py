from django.urls import path
from . import views

urlpatterns = [
    path('edit/', views.editClass),
    path('view/', views.viewClass),
]
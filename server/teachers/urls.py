from django.urls import path
from . import views

urlpatterns = [
    path('createclass/', views.createclass),
    path('addstudents/', views.addstudents),
    path('assignstudents/', views.addstudents),
    path('index/', views.index),
]

from django.urls import path
from . import views
from isp.admin import teacheradmin

urlpatterns = [
    path('change/', views.addstudents),
    #path('delete/', views.delete)
]
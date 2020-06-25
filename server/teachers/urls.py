from django.urls import path
from . import views
from .views import teacherupdate

urlpatterns = [
    path('class/edit/', views.editClass), #editclass
    path('class/view/', views.viewClass),  #viewclass
    path('edit/<str:pathway>', views.editPathway, name='edit-pathway'), #might need to chanage to pk
    path('<int:pk>/edit/', teacherupdate.as_view(), name='teacher-update'), 
]
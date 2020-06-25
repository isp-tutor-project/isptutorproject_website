from django.urls import path
from . import views
from .views import TeacherUpdate

urlpatterns = [
    path('<int:pk>/change/',         TeacherUpdate.as_view(), name='isp_teacher_change'),
    path('class/<int:pk>/change/',   views.editClass,         name="isp_class_change"),
    path('class/<int:pk>/',          views.viewClass,         name="isp_class_view"),
    path('pathway/<int:pk>/change/', views.editPathway,       name='isp_pathway_change'),
]

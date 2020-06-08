from django.contrib import admin
from django.contrib.admin import AdminSite

class TeachersAdminSite(AdminSite):
    site_header = "ISP Teacher's Portal"
    index_title = "Teacher's Administration"

teacheradmin = TeachersAdminSite(name = "teacher_admin")

from .models import (
    App, Feature, Activity, EnabledFeature, School, Teacher,
)

class FeatureInline(admin.TabularInline):
    model = Feature

class EnabledFeatureInline(admin.TabularInline):
    model = EnabledFeature

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        field = super().formfield_for_foreignkey(db_field, request, **kwargs)
        if db_field.name == "feature":
            app = request._obj
            field.queryset = field.queryset.filter(module__exact=app.module.id)
        return field

class TeacherInline(admin.TabularInline):
    model = Teacher

# class OrderedActivityInline(admin.TabularInline):
#     model = OrderedActivity

@admin.register(App)
class AppAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [ FeatureInline ]

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'app')
    inlines = [ EnabledFeatureInline ]

    def get_inline_instances(self, request, obj=None):
        request._obj = obj
        return [
            inline(self.model, self.admin_site) 
            for inline in self.inlines
            if obj is not None
        ]

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    inlines = [ TeacherInline ]
    
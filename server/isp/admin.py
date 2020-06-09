from django.contrib import admin

from .models import (
    App, Feature, Activity, EnabledFeature, School, Teacher,
    Student, Class, Pathway, OrderedActivity
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
    show_change_link = True

class ClassInline(admin.TabularInline):
    model = Class
    show_change_link = True

class PathwayInline(admin.TabularInline):
    model = Pathway

class StudentInline(admin.TabularInline):
    model = Student

class OrderedActivityInline(admin.TabularInline):
    model = OrderedActivity

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

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    inlines = [ ClassInline ]

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    # model = Class
    # teacheradmin.disable_action('delete_selected')
    # actions = ['delete_students', 'assign_students'] 
    inlines = [ StudentInline ]
    
    # def delete_students(self, modeladmin, request):
    #     return
    # delete_students.short_description = "Delete Selected Student(s)"

    # def assign_students(self, modeladmin, request):
    #     return
    # assign_students.short_description = "Assign Selected Student(s) to Pathway X"

@admin.register(Pathway)
class PathwayAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    inlines = [ OrderedActivityInline ]


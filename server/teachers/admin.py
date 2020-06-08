from django.contrib import admin
from isp.admin import teacheradmin

from .models import (
    App, Feature, Activity, EnabledFeature, School, Teacher,
    Student, Class, Pathway, OrderedActivity
)

class PathwayInline(admin.TabularInline):
    model = Pathway

class OrderedActivityInline(admin.TabularInline):
    model = OrderedActivity

class ClassAdmin(admin.ModelAdmin):
    teacheradmin.disable_action('delete_selected')
    actions = ['delete_students', 'assign_students']
    
    def delete_students(self, modeladmin, request):
        return
    delete_students.short_description = "Delete Selected Student(s)"

    def assign_students(self, modeladmin, request):
        return
    assign_students.short_description = "Assign Selected Student(s) to Pathway X"

class PathwayAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    inlines = [ OrderedActivityInline ]


teacheradmin.register(Class, ClassAdmin)
teacheradmin.register(Pathway, PathwayAdmin)

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
            activity = request._obj
            field.queryset = field.queryset.filter(app__exact=activity.app.id)
        return field

class TeacherInline(admin.TabularInline):
    model = Teacher
    extra = 1
    show_change_url = True


class PathwayInline(admin.TabularInline):
    model = Pathway
    show_change_link = True
    extra = 0

class ClassInline(admin.TabularInline):
    model = Class
    show_change_link = True
    extra = 0

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
    inlines = [ PathwayInline, ClassInline ]

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    inlines = [ StudentInline ]
    
@admin.register(Pathway)
class PathwayAdmin(admin.ModelAdmin):
    readonly_fields = ('edit_link',)
    def edit_link(self, instance):
        return 
    
    edit_link.short_description = "Edit"
    list_display = ('name', 'description', 'edit_link')
    inlines = [ OrderedActivityInline ]


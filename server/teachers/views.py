from django.shortcuts import render
from django.http import HttpResponse

from django.forms import inlineformset_factory
# from django.shortcuts import render, HttpResponseRedirect
# from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from isp.models import Teacher, Pathway, Class

PathwayFormset = inlineformset_factory(
    Teacher, Pathway, fields=('name',)
)

ClassFormset = inlineformset_factory(
    Teacher, Class, fields=('name',)
)

# won't need this, as Teacher creation is handled in the admin as School's inline

# class TeacherCreate(CreateView):
#     model = Teacher
#     fields = ['name']


class TeacherUpdate(UpdateView):
    """view for updating teacher with inlines"""
    model = Teacher
    fields = ['name', 'description']
    #  I'm simply using .django extension as I have different extentions for
    # .njk templates, django templates and html files and I'm tired of trying
    # to configure them properly
    template_name = "teacher_form.django"

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        if self.request.POST:
            data['my_pathways_formset'] = PathwayFormset(self.request.POST, instance=self.object)
            data["my_classes_formset"] = ClassFormset(self.request.POST, instance=self.object)
        else:
            data['my_pathways_formset'] = PathwayFormset(instance=self.object)
            data["my_classes_formset"] = ClassFormset(instance=self.object)

        return data

    def form_valid(self, form):
        """
        processes the formsets and saves them if valid.  do we need to add
        error messages??
        """
        context = self.get_context_data()
        my_pathways_formset = context['my_pathways_formset']
        my_classes_formset = context["my_classes_formset"]
        self.object = form.save()
        if my_pathways_formset.is_valid():
            my_pathways_formset.instance = self.object
            my_pathways_formset.save()
        if my_classes_formset.is_valid():
            my_classes_formset.instance = self.object
            my_classes_formset.save()
        return super().form_valid(form)


# class TeacherDelete(DeleteView):
#     model = Teacher
#     success_url = reverse_lazy('author-list')


# Add students/ assign pathways
def editClass(request, pk):
    return render(request, 'editclass.html')

# monitor student progress
def viewClass(request, pk):
    return render(request, 'viewclass.html')

# currently unused - edit pathway activities
def editPathway(request, pk):
    return render(request, 'addclass.html')

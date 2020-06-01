from django.shortcuts import render
from django.http import HttpResponse

# Create class page
def createclass(request):
    return render(request, 'createclass.html')

# Add students
def addstudents(request):
    return render(request, 'addstudents.html')

# Assign students
def assignstudents(request):
    return render(request, 'assignstudents.html')

# mock index page
def index(request):
    if (request.GET.get('btn_1')):
        return createclass(request)
    elif (request.GET.get('btn_2')):
        return addstudents(request)
    elif (request.GET.get('btn_3')):
        return assignstudents(request)
    return render(request, 'index.html')

    
    
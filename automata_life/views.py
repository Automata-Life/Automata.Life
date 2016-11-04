from django.shortcuts import render

from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, broa. Follow your heart.")
# Create your views here.

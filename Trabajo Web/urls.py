#from  django.conf.urls import url
from django.urls import path
from . import views



urlpatterns = {
    path('PaginaInicio',views.index, name='PaginaInicio')
}
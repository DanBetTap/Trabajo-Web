from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('services/', views.services, name='services'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('account/', views.account, name='account'),
    path('registration-complete/', views.registration_complete, name='registration_complete'),
]

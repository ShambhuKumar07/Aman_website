from django.urls import path
from .views import *
from .api_views import service_api



urlpatterns = [
    path('', home, name='home'),
    path('contact/', contact_view, name='contact'),
    path('career/', career_view, name='career'),
    path('about/', about_view, name='about'),
    path('api/services/', service_api),
    path('product/<slug:slug>/', product_detail, name='product_detail'),
    # path('product/<slug:slug>/', product_detail, name='product_detail'),
]
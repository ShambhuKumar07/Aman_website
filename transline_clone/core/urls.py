from django.urls import path
from .views import *
from .api_views import service_api



urlpatterns = [
    # path('', base, name='base'),
    path('', home, name='home'),
    path('contact/', contact_view, name='contact'),
    path('career/', career_view, name='career'),
    path('about/', about_view, name='about'),
    path('api/services/', service_api),

path(
    'category/<slug:slug>/',
    category_detail,
    name='category_detail'
),

path(
    'services/<slug:slug>/',
    service_detail,
    name='service_detail'
),


    path(
        'services/electrical-services/progressive-die-tooling/',
        progressive_die_tooling,
        name='progressive_die_tooling'
    ),

path(
    'services/electrical-services/prototyping-services/',
    prototyping_services,
    name='prototyping_services'
),


]
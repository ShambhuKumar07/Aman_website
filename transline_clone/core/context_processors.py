# from .models import Footer, UsefulLink, ServiceCategory

# def footer_data(request):
#     return {
#         'footer': Footer.objects.first(),
#         'links': UsefulLink.objects.all(),
#         'service_categories': ServiceCategory.objects.filter(parent=None),
#     }



from .models import Footer, UsefulLink, ServiceCategory

def footer_data(request):

    services_root = ServiceCategory.objects.filter(
        name='Services'
    ).first()

    service_categories = []

    if services_root:
        service_categories = services_root.get_children()

    return {
        'footer': Footer.objects.first(),
        'links': UsefulLink.objects.all(),
        'service_categories': service_categories,
    }
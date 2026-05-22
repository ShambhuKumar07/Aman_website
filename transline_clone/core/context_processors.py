from .models import Footer, UsefulLink

def footer_data(request):
    return {
        'footer': Footer.objects.first(),
        'links': UsefulLink.objects.all()
    }


from .models import Footer, UsefulLink

def footer_data(request):
    return {
        'footer': Footer.objects.first(),
        'links': UsefulLink.objects.all()
    }


from .models import NavProduct

def navbar_products(request):
    parents = NavProduct.objects.filter(parent__isnull=True)

    grouped_products = []
    for parent in parents:
        grouped_products.append({
            'parent': parent,
            'children': parent.children.all()
        })

    return {
        'grouped_products': grouped_products
    }
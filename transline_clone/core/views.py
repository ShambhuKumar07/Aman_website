
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import *

from .models import Certification
# =========================
# 🏠 HOME VIEW
# =========================
def home(request):
    about_items = About.objects.all()
    main_about = About.objects.filter(is_main=True).first()

    # 🔥 NAVBAR AUTO GROUPING
    parents = NavProduct.objects.filter(parent__isnull=True)
    certifications = Certification.objects.all()

    grouped_products = []
    for parent in parents:
        grouped_products.append({
            'parent': parent,
            'children': parent.children.all()
        })

    context = {
        'banners': Banner.objects.all(),
        'services': Service.objects.all(),
        'products': Product.objects.all(),
        'industries': Industry.objects.all(),
        'about_items': about_items,
        'main_about': main_about,

        # 🔥 Navbar Data
        'grouped_products': grouped_products,
        'certifications': certifications,
    }

    return render(request, 'home.html', context)


# =========================
# 📦 PRODUCT DETAIL (NEW 🔥)
# =========================
def product_detail(request, slug):
    product = NavProduct.objects.get(slug=slug)

    return render(request, "product_detail.html", {
        "product": product
    })


# =========================
# 📞 CONTACT VIEW
# =========================
def contact_view(request):
    contact_info = ContactInfo.objects.first()

    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        Contact.objects.create(   # ✅ FIX (ContactMessage → Contact)
            name=name,
            email=email,
            message=message
        )

        return JsonResponse({"status": "success"})

    return render(request, "contact.html", {
        "contact_info": contact_info
    })


# =========================
# 💼 CAREER VIEW
# =========================
def career_view(request):
    career = CareerPage.objects.first()
    why_join = WhyJoin.objects.all()
    locations = OfficeLocation.objects.all()

    if request.method == "POST":
        JobApplication.objects.create(
            name=request.POST.get("name"),
            phone=request.POST.get("phone"),
            email=request.POST.get("email"),
            position=request.POST.get("position"),
            resume=request.FILES.get("resume"),
            message=request.POST.get("message")
        )
        return redirect("career")

    return render(request, "career.html", {
        "career": career,
        "why_join": why_join,
        "locations": locations
    })


# =========================
# 🏢 ABOUT VIEW
# =========================
def about_view(request):
    about = AboutPage.objects.first()
    chairman = Chairman.objects.first()

    board = TeamMember.objects.filter(category='board')
    key = TeamMember.objects.filter(category='key')
    leaders = TeamMember.objects.filter(category='leader')

    locations = AboutLocation.objects.all()

    return render(request, "about.html", {
        "about": about,
        "chairman": chairman,
        "board": board,
        "key": key,
        "leaders": leaders,
        "locations": locations
    })



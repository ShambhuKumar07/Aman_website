
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import *

from .models import Certification
# =========================
# 🏠 HOME VIEW
# =========================
 
from .models import ProductCategory

def base(request):
    return render(request,'base.html')




def home(request):

    about_items = About.objects.all()
    main_about = About.objects.filter(is_main=True).first()

    certifications = Certification.objects.all()

    # ONLY MAIN CATEGORY
    navbar_categories = ProductCategory.objects.filter(parent=None)

    context = {
        'banners': Banner.objects.all(),
        'services': Service.objects.all(),
        'products': Product.objects.all(),
        'industries': Industry.objects.all(),
        'about_items': about_items,
        'main_about': main_about,

        'navbar_categories': navbar_categories,
        'certifications': certifications,
    }

    return render(request, 'home.html', context)




 
# =========================
# 📞 CONTACT VIEW
# =========================
def contact_view(request):
    contact_info = ContactInfo.objects.first()
    navbar_categories = ProductCategory.objects.filter(parent=None)

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
        "contact_info": contact_info,
        'navbar_categories': navbar_categories,
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

    navbar_categories = ProductCategory.objects.filter(parent=None)

    return render(request, "about.html", {
        "about": about,
        "chairman": chairman,
        "board": board,
        "key": key,
        "leaders": leaders,
        "locations": locations,
        'navbar_categories': navbar_categories,
    })





from django.shortcuts import get_object_or_404


# # CATEGORY DETAIL PAGE
# def category_detail(request, slug):
#     navbar_categories = ProductCategory.objects.filter(parent=None)
#     category = get_object_or_404(
#         ProductCategory,
#         slug=slug
#     )

#     context = {
#         'category': category
#     }

#     return render(
#         request,
#         'category_detail.html',
#         context
#         'navbar_categories': navbar_categories,
#     )



# CATEGORY DETAIL PAGE
def category_detail(request, slug):

    navbar_categories = ProductCategory.objects.filter(parent=None)

    category = get_object_or_404(
        ProductCategory,
        slug=slug
    )

    context = {
        'category': category,
        'navbar_categories': navbar_categories,
    }

    return render(
        request,
        'category_detail.html',
        context
    )
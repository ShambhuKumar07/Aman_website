from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *

admin.site.register(Banner)
admin.site.register(Service)
admin.site.register(Product)
admin.site.register(Industry)
admin.site.register(Career)
admin.site.register(Contact)

from .models import About

admin.site.register(About)

from .models import Footer, UsefulLink

admin.site.register(Footer)
admin.site.register(UsefulLink)

from .models import ContactInfo

admin.site.register(ContactInfo)

######### carier 
from .models import CareerPage, WhyJoin, OfficeLocation, JobApplication

admin.site.register(CareerPage)
admin.site.register(WhyJoin)
admin.site.register(OfficeLocation)
admin.site.register(JobApplication)

####### about

from .models import AboutPage, Chairman, TeamMember, AboutLocation

admin.site.register(AboutPage)
admin.site.register(Chairman)
admin.site.register(TeamMember)
admin.site.register(AboutLocation)


from .models import NavProduct

from django.contrib import admin
from .models import NavProduct

from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from .models import NavProduct

@admin.register(NavProduct)
class NavProductAdmin(DraggableMPTTAdmin):
    list_display = ('tree_actions', 'indented_title', 'slug', 'parent')
    list_display_links = ('indented_title',)
    search_fields = ('name', 'slug')
    list_filter = ('parent',)
    prepopulated_fields = {"slug": ("name",)}

    mptt_level_indent = 20
    class Media:
        css = {
            'all': ('admin/custom_admin.css',)
        }



from .models import Certification

admin.site.register(Certification)
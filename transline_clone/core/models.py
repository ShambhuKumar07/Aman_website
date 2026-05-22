from django.db import models

# Create your models here.
from django.db import models

class Banner(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    image = models.ImageField(upload_to='banners/')

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.ImageField(upload_to='services/')

    def __str__(self):
        return self.title


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.name



from django.db import models
from django.utils.text import slugify
 

from mptt.models import MPTTModel, TreeForeignKey
 
 
class Industry(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='industries/')

    def __str__(self):
        return self.name


class Career(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    resume = models.FileField(upload_to='resumes/')
    applied_on = models.DateTimeField(auto_now_add=True)


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class About(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='about/')
    is_main = models.BooleanField(default=False)  # 🔥 control for right side content

    def __str__(self):
        return self.title


class Footer(models.Model):
    company_description = models.TextField()

    logo = models.ImageField(upload_to='footer/', blank=True, null=True)

    phone1 = models.CharField(max_length=20)
    phone2 = models.CharField(max_length=20)

    email = models.EmailField()

    address_noida = models.TextField()
    address_bangalore = models.TextField()

    # 🌐 Social Links
    linkedin = models.URLField(blank=True, null=True)
    youtube = models.URLField(blank=True, null=True)

    # 📩 Newsletter text
    newsletter_title = models.CharField(max_length=200, default="Subscribe Newsletter")

    # 🗺️ Google Map Embed
    map_embed = models.TextField(blank=True, null=True)

    def __str__(self):
        return "Footer Content"


class UsefulLink(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class ContactInfo(models.Model):
    title = models.CharField(max_length=200, default="Get in Touch")
    description = models.TextField()

    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    # optional map
    map_embed = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title



# HERO SECTION
class CareerPage(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title


# WHY JOIN SECTION
class WhyJoin(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title


# LOCATIONS
class OfficeLocation(models.Model):
    city = models.CharField(max_length=100)
    office_type = models.CharField(max_length=100)

    def __str__(self):
        return self.city


# JOB APPLICATION
class JobApplication(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    position = models.CharField(max_length=200)
    resume = models.FileField(upload_to='resumes/')
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name   



# COMPANY INTRO
class AboutPage(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title


# CHAIRMAN
class Chairman(models.Model):
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='about/', blank=True, null=True)

    def __str__(self):
        return self.name


# TEAM (Board, Leadership, etc.)
class TeamMember(models.Model):
    CATEGORY_CHOICES = (
        ('board', 'Board of Directors'),
        ('key', 'Key Managerial Personnel'),
        ('leader', 'Leadership Team'),
    )

    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='team/', blank=True, null=True)

    def __str__(self):
        return self.name


# LOCATIONS
class AboutLocation(models.Model):
    city = models.CharField(max_length=100)
    office_type = models.CharField(max_length=100)
    map_image = models.ImageField(upload_to='locations/', blank=True, null=True)  # 👈 NEW

    def __str__(self):
        return self.city




class Certification(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=10, blank=True)
    pdf = models.FileField(upload_to='certifications/', blank=True, null=True)

    def __str__(self):
        return self.title
    


#######################
# navbar Product
#######################


from mptt.models import MPTTModel, TreeForeignKey

class ProductCategory(MPTTModel):

    name = models.CharField(max_length=100)

    slug = models.SlugField(
        unique=True,
        blank=True
    )

    icon = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )

    # NEW FIELDS
    overview = models.TextField(
        blank=True,
        null=True
    )

    specifications = models.TextField(
        blank=True,
        null=True
    )

    gallery_image1 = models.ImageField(
        upload_to='category_gallery/',
        blank=True,
        null=True
    )

    gallery_image2 = models.ImageField(
        upload_to='category_gallery/',
        blank=True,
        null=True
    )

    class MPTTMeta:
        order_insertion_by = ['name']

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
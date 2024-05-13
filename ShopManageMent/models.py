from django.db import models
from persian_date.utils import jalali_converter_only_date
# Create your models here.
from ckeditor.fields import RichTextField


class Image(models.Model):
    image_file = models.ImageField(upload_to="images/products",null=True)
    image_url = models.CharField(max_length=200,null=True)


class ShowFilter(models.Model):
    title=models.CharField(max_length=200,null=True)
class Color (models.Model):
    name = models.CharField(max_length=255,null=True)
    color_code = models.CharField(max_length=255,null=True)

class Size (models.Model):
    name = models.CharField(max_length=255,null=True)
    


class CountInventory(models.Model):
    size = models.ForeignKey(Size, null=True,on_delete=models.CASCADE,related_name="countinventory_S")
    count = models.PositiveBigIntegerField(null=True,default=0)

class Inventory(models.Model):
    color = models.ForeignKey(Color, null=True, on_delete=models.CASCADE,related_name="inventory_C")
    count_inventory= models.ManyToManyField(CountInventory,related_name="inventory_count")



class CategoryThree (models.Model):
    title= models.CharField(max_length=255,null=True)

class CategoryTwo(models.Model):
    title= models.CharField(max_length=255,null=True)

    category_three= models.ManyToManyField(CategoryThree,related_name="cat_2")

class CategoryOne(models.Model):
    title= models.CharField(max_length=255,null=True)

    category_two= models.ManyToManyField(CategoryTwo,related_name="cat_1")

class Propery(models.Model):
    title = models.CharField(max_length=255,null=True)
    dis= models.CharField(max_length=255,null=True)
class SpeciFication(models.Model):
    title = models.CharField(max_length=255,null=True)
    dis= models.CharField(max_length=255,null=True)

class Product(models.Model):
    title = models.CharField(max_length=200,null=True)
    product_code = models.CharField(max_length=200,null=True)
    price  = models.CharField(max_length=200,null=True)
    image = models.ManyToManyField(Image)
    main_image=models.ImageField(upload_to="images/MainProductImages",null=True)
    discription = models.TextField(null=True)
    created = models.DateField(auto_now_add=True,null=True)
    inventory= models.ManyToManyField(Inventory,related_name="product_inv")
    category = models.ManyToManyField(CategoryOne,related_name="product_category")
    property = models.ManyToManyField(Propery,related_name="product_property")
    specification=models.ManyToManyField(SpeciFication,related_name="product_specification")
    show_filters=models.ManyToManyField(ShowFilter,related_name="product_show_filters")
    


    def __str__(self):
        try:
            return str(self.product_code)
        except:
            return "None"

    def total_invenory (self):
        try:
            total_count=0
            for inventory in self.inventory.all():
                for count in inventory.count_inventory.all():
                    total_count+=count.count
            return total_count
        except:
            return 0
    def jtime (self):
        return jalali_converter_only_date(self.created)
    



class SliderImage(models.Model):
    image = models.ManyToManyField(Image)

class ReturnTerms(models.Model):
    text = RichTextField(null=True)

class HowToBuy(models.Model):
    text = RichTextField(null=True)

class TermsAndConditions(models.Model):
    text=RichTextField(null=True)
class WhyUs(models.Model):
    text=RichTextField(null=True)



class Qustion(models.Model):
    quest = models.CharField(max_length=100,null=True)
    answer = models.TextField(null=True)




class TitleQuestion(models.Model):
    title = models.CharField(max_length=100,null=True)
    quest = models.ManyToManyField(Qustion)



class AbutUs(models.Model):
    text =RichTextField(null=True)
    
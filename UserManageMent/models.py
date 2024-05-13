
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from persian_date.utils import jalali_converter_only_date
import InstallMent


class UserAccountManager(BaseUserManager):
    def create_user(self,fullname,phone_number,city,store_name,password):
        if not phone_number:
            raise ValueError("enter all fieldes")

        else:
            user = self.model(fullname=fullname,phone_number=phone_number,city=city,store_name=store_name,password=password)
            

            user.set_password(password)
            user.save()


            return user




    def create_superuser(self,fullname,phone_number,city,store_name,password):

        user = self.create_user(fullname=fullname,phone_number=phone_number,city=city,store_name=store_name,password=password)
        user.password = password
        password = password
        user.user_type='manager'
        user.set_password(password)
        user.save()
        return user





class UserAccount(AbstractBaseUser):
    role = (
        ('برشکار', 'برشکار'),
        ('خیاط', 'خیاط'),
        ('مدیر تولید', 'مدیر تولید'),
    )


    user_type = models.CharField(max_length=50, choices = role, default = 'مدیر تولید')
    first_name =models.CharField(max_length=255,null=True,blank=True)
    last_name =models.CharField(max_length=255,null=True,blank=True)
    phone= models.CharField(max_length=200,null=True)
    state= models.CharField(max_length=200,null=True)
    city = models.CharField(max_length=200,null=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=200,unique=True)
    created = models.DateField(auto_now_add=True,null=True)

    
# permissions begin

    
# permissions end





    is_active = models.BooleanField(default =True)
    is_admin = models.BooleanField(default =True)
    is_staff = models.BooleanField(default =True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS =['first_name','last_name',]


    objects = UserAccountManager()

    def get_state(self):
        try:
            state_obj = InstallMent.models.State.objects.get(code =self.state)
            return state_obj.name
        except:
            return ""
    def get_city(self):
        try:
            city_obj = InstallMent.models.City.objects.get(code =self.city)
            return city_obj.name
        except:
            return ""

    def jtime (self):
        return jalali_converter_only_date(self.created)

    def has_perm (self,perm,obj=None):
        return True

    def has_module_perms(self,app_label):
        return True

    def __str__(self):
        return self.username

    

class GroupPermissionn(models.Model):
    group_name = models.CharField(max_length=200,null=True)
    read= models.JSONField(null=True)
    create= models.JSONField(null=True)
    delete= models.JSONField(null=True)
    edit= models.JSONField(null=True)
from django.db import models
from UserManageMent.models import  UserAccount
from InstallMent.models import City,State
# Create your models here.

class Addres (models.Model):
    first_name= models.CharField(max_length=200,null=True)
    last_name= models.CharField(max_length=200,null=True)
    state= models.ForeignKey(State, null=True,on_delete=models.CASCADE)
    city = models.ForeignKey(City, null=True,on_delete=models.CASCADE)
    postal_code = models.CharField(max_length=200,null=True)
    phone_number = models.CharField(max_length=200,null=True)
    meli_code = models.CharField(max_length=200,null=True)
    house_number= models.CharField(max_length=200,null=True)
    main_addres= models.TextField(null=True)




class ActivityType(models.Model):
    activity_roll = (
        ('wholesaler', 'WHOLESALER'),
        ('store', 'STORE'),
        ('free sale', 'FREE SALE'),
    )
    store_type_roll=(
        ("ارزانسرا","ارزانسرا"),
        ("بوتیک","بوتیک"),
        ("حراجی","حراجی")
    )
    type_active = models.CharField(max_length=50, choices = activity_roll, default = 'wholesaler')
    store_type = models.CharField(max_length=50, choices = store_type_roll)

    state_whole_saler = models.ForeignKey(State,on_delete=models.SET_NULL,null=True )
    city_whole_saler = models.ForeignKey(City,on_delete=models.SET_NULL,null=True )
    store_address = models.TextField(null=True)
 
class Representative(models.Model):
    firstname= models.CharField(max_length=50,null=True)
    lastname= models.CharField(max_length=50,null=True)
    phone_number =models.CharField(max_length=50,null=True)
    dis = models.TextField(null=True)

class Networker(models.Model):


    work_type_roll=(
        ("men","MEN"),
        ("women","WOMEN"),
        ("child","CHILD"),
        ("dosen matter","DOSEN MATTER")
    )
    poz_machine_roll=(
        ("i have","I HAVE"),
        ("i dont have","I DONT HAVE"),
        ("some one else","SOME ONE ELSE"),
  
    )
    addres = models.ManyToManyField(Addres)
    type_of_activity= models.OneToOneField(ActivityType,on_delete=models.CASCADE,null=True)
    user= models.OneToOneField(UserAccount,on_delete=models.CASCADE,related_name="user_networker")

    work_type= models.CharField(max_length=50, choices = work_type_roll)
    social_media_status= models.BooleanField(default=False)
    rubika_id =models.CharField(max_length=50,null=True)
    telegram_id= models.CharField(max_length=50,null=True)
    instagram_id= models.CharField(max_length=50,null=True)
    poz_machine_status= models.CharField(max_length=50, choices = poz_machine_roll)
    poz_machine_owner_fullname = models.CharField(max_length=50,null=True)
    is_representative = models.BooleanField(default=False)
    representative = models.OneToOneField(Representative,on_delete=models.CASCADE,null=True)
    phone_vrify_code = models.IntegerField(default=0,null=True)
    phone_vrify_status=models.BooleanField(default=False)
    


    

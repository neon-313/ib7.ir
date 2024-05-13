from django.db import models
from persian_date.utils import jalali_converter_only_date
from UserManageMent.models import UserAccount

from ShopManageMent.models import Product


from persiantools.jdatetime import JalaliDate

def date_p(english_date):
    
    split_date = english_date.split("-")
    year, month, day = map(int, split_date)

    jalali_date = JalaliDate.to_jalali(year, month, day)
    formatted_jalali_date = f"{jalali_date.year}-{jalali_date.month:02d}-{jalali_date.day:02d}"

    return formatted_jalali_date


class Deposit(models.Model):
    MARITAL_STATUS_CHOICES = [
        ('نقد', 'نقد'),
        ('چک', 'چک'),
     
    ]
   
         
    peyment_type= models.CharField(null=True,max_length=20, choices=MARITAL_STATUS_CHOICES)
    fake_id=models.CharField(max_length=200,null=True)
    bestankar_price =models.CharField(null=True,max_length=200)
    price_deposited = models.CharField(null=True,max_length=200)
    deposit_date = models.CharField(null=True,max_length=80)
    card_number_origin = models.CharField(null=True,max_length=100)
    card_number_destination = models.CharField(null=True,max_length=100)
    money_recaive_type = models.BooleanField(default=False)
    money_recaiver_jmwear = models.IntegerField(null=True)
    moeny_recaiver_ib7= models.IntegerField(null=True)
    balance = models.CharField(null=True,max_length=200)
    check_peyment= models.OneToOneField("CheckPeyment",on_delete=models.CASCADE,null=True)
    dis = models.TextField(null=True)
    def check_state (self):
        if int(self.price_deposited) == 0:
            return {"name":"predeposit","value":self.bestankar_price}
        elif int(self.bestankar_price) == 0:
            return {"name":"deposited","value":self.price_deposited}
      


class ChashPeyment(models.Model):

    destination_pay = models.BooleanField(default=False)
    money_receiver = models.IntegerField(null=True)
    money_recaiver_ib7=models.IntegerField(null=True)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    card_numer_origin = models.CharField(max_length=200,null=True)
    card_name_origin = models.CharField(max_length=200,null=True)
    amount=models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class CheckPeyment(models.Model):
    amount= models.CharField(max_length=200,null=True)
    image = models.ImageField(upload_to="images/check_images/",null=True)
    check_owner=models.CharField(max_length=50,null=True)
    check_recaiver =models.CharField(max_length=50,null=True)
    discount = models.CharField(max_length=200,null=True)
    dead_time = models.CharField(max_length=200,null=True)
    prepeyment= models.CharField(max_length=200,null=True)


class Document(models.Model):
    file_image = models.ImageField(upload_to="image/documents",null=True)

class City (models.Model):
    name = models.CharField(max_length=200,null=True)
    code = models.CharField(max_length=50,null=True)

    def __str__ (self):
        return self.name
class State(models.Model):
    name = models.CharField(max_length=200,null=True)
    code = models.CharField(max_length=50,null=True)
    cities = models.ManyToManyField(City)

    def __str__ (self):
        return self.name

class Costumer(models.Model):
    user= models.OneToOneField(UserAccount,null=True,related_name="costumer_user",on_delete=models.CASCADE)
    fake_id = models.CharField(max_length=200,null=True)
    firstname=models.CharField(max_length=200,null=True)
    lastname=models.CharField(max_length=200,null=True)
    phonenumber = models.CharField(max_length=200,null=True)
    state = models.IntegerField(null=True)
    city = models.IntegerField(null=True)
    conteract_type= models.CharField(max_length=200,null=True)
    conteract_date = models.CharField(max_length=200,null=True)
    documnent = models.ManyToManyField(Document)
    discription = models.TextField(null=True)
    deposits= models.ManyToManyField(Deposit,related_name="dep_costu")


    def total_deposit_price(self):
        try:
            total = 0
            for deposit in self.deposits.all():
                total += int(deposit.price_deposited)
            return total
        
        except:
            return 0

    def total_factor_price (self):
        try:
            total_price=0
            for factor in self.order_costumer.all():
                total_price+=factor.final_price()
            return total_price
        except:
            return 0
        
    def get_state (self):
        try:
            state_obj = State.objects.get(code = self.state)
            return state_obj.name
        except:
            return " "
    def get_city(self):
        try:
            city_obj = City.objects.get(code = self.city)
            return city_obj.name
        except:
            return " "
    def factors_count (self):
       return self.order_costumer.all().count()
    
    def factor_debt(self):
        try:
            debit_price = 0
            for factor in self.order_costumer.all():
                for peyment in factor.instal_ments.all():

                    if peyment.is_payed == False:
                        try:
                            debit_price+=int(peyment.price)
                        except:
                            debit_price+=float(peyment.price)
            return debit_price
        except:
            return 0
    def factor_paid(self):
        try:
            paid_price = 0
            for factor in self.order_costumer.all():
                for peyment in factor.instal_ments.all():

                    if peyment.is_payed :
                        try:
                            paid_price+=int(peyment.price)
                        except:
                            paid_price+=float(peyment.price)
            return paid_price
        except:
            return 0

    
        

class OrderProduct (models.Model):
    main_product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    title = models.CharField(max_length=200,null=True)
    price = models.CharField(max_length=200,null=True)
    numbers = models.IntegerField(null=True)


    def total_price (self):

        return int(self.price) * self.numbers
    




class PeymendDate(models.Model):
    choices = (
        ("1","1"),
        ("2","2"),
        ("3","3"),
        ("4","4")
    )

    peyment  = models.CharField(max_length=200,choices=choices,default="1")
    year = models.CharField(max_length=200,null=True)
    month  = models.CharField(max_length=200,null=True)
    day = models.CharField(max_length=200,null=True)
    price = models.CharField(max_length=200,null=True)
    is_payed = models.BooleanField(default=False)
    peyed_date = models.CharField(max_length=200,null=True)



    
class Order (models.Model):
    MARITAL_STATUS_CHOICES = [
        ('نقد', 'نقد'),
        ('اقساط', 'اقساط'),
        ('چک', 'چک'),
        ('نسیه', 'نسیه'),
         
    ]
    fake_id=models.CharField(max_length=200,null=True)
    costumer = models.ForeignKey(Costumer,on_delete=models.CASCADE,related_name="order_costumer",null=True)
    peyment_type= models.CharField(null=True,max_length=20, choices=MARITAL_STATUS_CHOICES)
    cash_peyment_detail=models.OneToOneField(ChashPeyment,null=True,on_delete=models.CASCADE)
    check_peyment_detail=models.OneToOneField(CheckPeyment,null=True,on_delete=models.CASCADE)
    order_code = models.CharField(max_length=200,null=True)
    created = models.CharField(max_length=200,null=True)
    total_price = models.CharField(max_length=200,null=True)
    prepeyment_date = models.CharField(max_length=200,null=True)
    products = models.ManyToManyField(OrderProduct,related_name="order_pro")
    marsole_code = models.CharField(max_length=200,null=True)
    instal_ments = models.ManyToManyField(PeymendDate,related_name="order_peyment")

    pish_pardakht = models.CharField(max_length=200,null=True)
    takhfif = models.CharField(max_length=200,null=True)
    dis = models.TextField(null=True)
    image = models.ImageField(upload_to="images/factor_images/",null=True)

    def costumer_name(self):
        try:
            return self.costumer.firstname  + " " + self.costumer.lastname
        except:
            return ""

    def total_price_method (self):
        total_price = 0 
        for product in self.products.all():
            total_price_in_pro = int(product.price) *int(product.numbers)
            total_price+=total_price_in_pro
        return int(total_price)



    def persian_date (self):
        try:
           
            return date_p(self.created)
        except:
            try:
            
                return jalali_converter_only_date(self.created)
            except:
                return self.created
                
    
    def final_price(self):
        try:
            total_price = 0 
            for product in self.products.all():
                total_price_in_pro = int(product.price) *int(product.numbers)
                total_price+=total_price_in_pro
            return total_price
    
        except:
            return 0
    def khalesi_chash_pey(self):
        try:
            total_price = self.final_price()
            mian_pay_price = int(self.cash_peyment_detail.amount) + int(self.cash_peyment_detail.discount) 
            mande = int(total_price) - int(mian_pay_price)
            return mande
        except:
            return 0

    def khalesi_check_pey(self):
        try:
            total_price = self.final_price()
            main_pay_price = int(self.check_peyment_detail.amount) + int(self.check_peyment_detail.discount) + int(self.check_peyment_detail.prepeyment)
            mande = int(total_price) - int(main_pay_price)
            return mande
        except:
            return 0



    def kol_price (self):
        if self.peyment_type == "اقساط":
            try:
                sumery = int(self.pish_pardakht) + int(self.takhfif)
                total_price = 0 
                for product in self.products.all():
                    total_price_in_pro = int(product.price) *int(product.numbers)
                    total_price+=total_price_in_pro
                return total_price - sumery  
            except:
                pass
        elif self.peyment_type == "نقد":
            return self.khalesi_chash_pey()
        elif self.peyment_type == "چک":
            return self.khalesi_check_pey()
        else :
             return self.final_price()
    def factor_debt(self):
        try:
            debit_price = 0
           
            for peyment in self.instal_ments.all():

                if peyment.is_payed == False:
                    try:
                        debit_price+=int(peyment.price)
                    except:
                        debit_price+=float(peyment.price)
            return debit_price
        except:
            return 0
    def factor_paid(self):
        try:
            paid_price = 0
           
            for peyment in self.instal_ments.all():

                if peyment.is_payed :
                    try:
                        paid_price+=int(peyment.price)
                    except:
                        paid_price+=float(peyment.price)
            return paid_price
        except:
            return 0



class BankAccount(models.Model):
    title= models.CharField(max_length=200,null=True)
    account_number = models.CharField(max_length=200,null=True)
    account_owner = models.CharField(max_length=200,null=True)
    
class PostSmsMain(models.Model):
    role = (
        ('پست', 'پست'),
        ('تیپاکس', 'تیپاکس'),
        ('باربری', 'باربری'),


    )
    post_type = models.CharField(max_length=50, choices = role, default = 'پست')
    firstname = models.CharField(max_length=200,null=True)
    lastname = models.CharField(max_length=200,null=True)
    marsole_code = models.TextField(null=True)
    phone_number= models.CharField(max_length=200,null=True)
    created = models.DateField(auto_now_add=True,null=True)
    fake_id =  models.CharField(max_length=200,null=True)

    def persian_date (self):
        return jalali_converter_only_date(self.created)
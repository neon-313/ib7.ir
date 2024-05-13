from django.shortcuts import render
from django.contrib.auth.models import User
import requests
from .models import *
import random
import os
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404
import datetime
from persian_date.utils import jalali_converter_only_date
from django.views.decorators.csrf import csrf_exempt
import random
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from jdatetime import datetime as jdatetime
from .serializers import * 
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import JSONParser,FileUploadParser
from rest_framework import generics
from .create_installment import convert_date_payed
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import datetime
from persian_date.utils import jalali_converter_only_date
from pathlib import Path
def send_sms(fullname,marsole_code,phone,post_type):
    
    url = "https://api.sms.ir/v1/send/verify"
    headers = {
        "content-type":"application/json",
        "X-API-KEY":"hyXhWv2XL8wBXdJh2g1Ym3bDIKWgiQW4WJGcxEgg3HpiSGdQrL3rY1F7Mjb50yBW"
    }
    data = {
        "mobile": phone,
        "templateId": 245365,
        "parameters": [
        {
            "name": "fullname",
            "value": fullname
        },
        {
            "name": "marsole",
            "value": marsole_code
        },
        {
            "name": "post_type",
            "value": post_type
        },
        ]
    }

    response = requests.post(url=url,json=data,headers=headers)
    print(response.json())

def convet_fake_id (query_set):
    fake_id= 1
    for query in query_set:
        query.fake_id = fake_id
        query.save()
        fake_id+=1
def costumer_list_page(request):
    return render (request,"InstallMent/CostumerManageMent/CostumerList.html")  

class CreatCostumer(generics.CreateAPIView):
    def post(self,request):
        try:
            data = request.data
            firstname = data['firstname']
            lastname = data['lastname']
            phone_number = data['phone_number']
            conteract_type = data['conteract_type']
            state = data['state']
            city = data['city']
            discription = data['discription']
            conteract_date = data['conteract_date']
            password = data['password']
            confirm_password = data['confirm_password']
            try:
                UserAccount.objects.get(username=phone_number)
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"message":"کاربر مورد نظر در حال حاظر وجود دارد"})  
            except:
                pass
            
            if len(password) < 8:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"message":"رمز عبور باید بیشتر از 8 رقم باشد"})
            if password != confirm_password:  
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"message":"رمز عبور ها شباهت ندارند"})
                

            new_user=UserAccount(
                first_name=firstname,
                last_name=lastname,
                username=phone_number,
                state=state,
                city=city,
                is_active=False
            )
            new_user.set_password(password)
            new_user.save()
            new_costumer = Costumer(
                user=new_user,
                firstname=firstname,
                lastname=lastname,
                phonenumber=phone_number,
                state=state,
                city=city,
                conteract_type=conteract_type,
                conteract_date=conteract_date,
                discription=discription,
            )
            new_costumer.save()
            try:
            
                image_paths=request.session.get('galery_image_product_ses')
                image_objs=[]
                for item in image_paths:
                    image_model =Document()
                    image_model.file_image.save(item['filename'],open(item['path'],'rb'))
                    image_model.save()
                    new_costumer.documnent.add(image_model)
                    image_objs.append(image_model)

                    path = Path(item['path'])
                    if path.exists():
                        path.unlink()
                request.session['galery_image_product_ses']=[]
            except:
                pass
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST,data={"message":"مشکلی پیش آمده لطفا چند دقیقه دیگر باز امتحان کنید"})
class InstallMentMangeMent(APIView):


    def get (self,request):
        costumers = Costumer.objects.all().order_by("-id")
        for costumer in costumers :
            if costumer.user is None:
                new_user= UserAccount(
                    first_name= costumer.firstname,
                    last_name=costumer.lastname,
                    state = costumer.state,
                    city = costumer.city,
                    username=costumer.phonenumber,
                    is_active=False
                )
                new_user.set_password("12345678")
                new_user.save()
                costumer.user=new_user
                costumer.save()

        m_data = CostumerSerializer(costumers,many=True).data
        for item in m_data:
            item['user_id'] = item['user']['id']
            item['is_active']=item['user']['is_active']
        
        return Response(status=status.HTTP_202_ACCEPTED,data={"data":m_data})


    def delete (self,request,costumer_id):
        try:
            costumer_obj = Costumer.objects.get(id=costumer_id)
            costumer_obj.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_202_ACCEPTED)
    def put (self,request,costumer_id):
        try:
            data = request.data
            costumer_obj = Costumer.objects.get(id=costumer_id)
            firstname =data['firstname']
            lastname =data['lastname']
            phone_number =data['phone_number']
            conteract_type =data['conteract_type']
            state =data['state']
            city =data['city']
            conteract_date =data['conteract_date']
            discription =data['discription']
            costumer_obj.firstname=firstname
            costumer_obj.lastname=lastname
            costumer_obj.phonenumber=phone_number
            costumer_obj.conteract_type=conteract_type
            costumer_obj.conteract_date=conteract_date
            costumer_obj.state=state
            costumer_obj.city=city
            costumer_obj.discription=discription
            costumer_obj.save()            

            return Response(status=status.HTTP_202_ACCEPTED)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST,data={"message":"مشکلی پیش آمده لطفا چند دقیقه دیگر باز امتحان کنید"})

        
def create_costumer_page(request):
    context = {
        "states":State.objects.all()
    }

    return render (request,"InstallMent/CostumerManageMent/CreateCostumer.html",context)  



def edit_costumer_page(request,costumer_id):
    costumer_obj = Costumer.objects.get(id=costumer_id)
    context = {
        "states":State.objects.all(),
        "costumer_obj":costumer_obj,
    }
    return render(request,"InstallMent/CostumerManageMent/EditCostumer.html",context)


def document_images_page(request,costumer_id):
    costumer_obj = Costumer.objects.get(id=costumer_id)
    context={
        "costumer_obj":costumer_obj
    }
    return render(request,"InstallMent/CostumerManageMent/DocumentImages.html",context)


@api_view(['DELETE'])
def delete_document(request,document_id):
    document_obj = Document.objects.get(id=document_id)
    document_obj.delete()
    return Response(status= status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def create_document(request,costumer_id):

    documentss= request.FILES.getlist("documentss")
    costumer_obj = Costumer.objects.get(id=costumer_id)

    for item in documentss:
        new_document = Document(file_image=item)
        new_document.save()
        costumer_obj.documnent.add(new_document)
    return Response(status=status.HTTP_201_CREATED)


#Factor Manage Ment begin

def factor_list_page(request):
    # random_number = random.randint(100000, 999999)

    return render(request,"InstallMent/FactorManageMent/FactorList.html")

def create_factor_page(request):
    now = datetime.datetime.now().date()
    list_date = jalali_converter_only_date(now).split('/')

    context = {
        "costumers":Costumer.objects.all().order_by("-id"),
        "counts":[1,2,3,4],
        "factor_id":f"E_{random.randint(100000, 999999)}",
        "now":f"{list_date[0]}-{list_date[1]}-{list_date[2]}",    
        "products":Product.objects.all(),

    }
    try:
        response = requests.get(url='http://jmwear.ir:800/ManagerDashbord/all_tailors')
        context['tailors']= response.json()
    except:
        pass

    return render(request,"InstallMent/FactorManageMent/CreateFactor.html",context)




class PeymentTypeManageMent(APIView):
    def post(self, request,factor_id):
        factor_obj = Order.objects.get(id=factor_id)
        if factor_obj.peyment_type == "نقد":

            data = request.data
            try:
                money_receiver= data['money_receiver']
                bol= True
            except:
                money_receiver=data['money_recaiver_ib7']
                bol=False
            
            new_cash_peyment= ChashPeyment(
                destination_pay=bol,
                money_receiver = money_receiver,
                card_numer_origin = data['card_numer_origin'],
                card_name_origin = data['card_name_origin'],
                amount = data['amount'],
            )
            new_cash_peyment.save()
            factor_obj.cash_peyment_detail=new_cash_peyment
                
            if factor_obj.costumer.deposits.all():
                deposit_obj= factor_obj.costumer.deposits.last()
                new_deposit = Deposit(
                    price_deposited=0,
                    bestankar_price= new_cash_peyment.amount,
                    balance= int(deposit_obj.balance)-int(new_cash_peyment.amount) ,
                    deposit_date=factor_obj.persian_date(),
                    dis=f"پرداخت مبلغ فاکتور  {factor_obj.order_code}"


                )
                new_deposit.save()
                factor_obj.costumer.deposits.add(new_deposit)

            return Response(status=status.HTTP_201_CREATED,data={"message":"صورت حساب مورد نظر با موفقیت ثبت شد"})

            
        elif factor_obj.peyment_type == "چک":
            data = request.data
            main_date = ""
            try:
                list_date = data['dead_time'].split("-")
                main_date = f"{list_date[0]}/{list_date[1]}/{list_date[2]}"
            except:
                pass

            new_check_peyment = CheckPeyment(
                amount=data['amount'],
                check_owner=data['owner'],
                prepeyment=data['prepeyment'],
                dead_time=main_date
            )
            new_check_peyment.save()
            try:
                image_path=request.session['check_image_path']
                file_name = os.path.basename(image_path)
                    

                new_check_peyment.image.save(file_name,open(image_path,'rb'))
                new_check_peyment.save()
                path = Path(image_path)
                if path.exists():
                        path.unlink()
                request.session['check_image_path']=None
                        
            except:
                pass
            
            main_price = int(new_check_peyment.amount) + int(new_check_peyment.prepeyment)
            if factor_obj.costumer.deposits.all():
                deposit_obj= factor_obj.costumer.deposits.last()
                new_deposit = Deposit(
                    price_deposited=0,
                    bestankar_price= main_price,
                    balance=int(deposit_obj.balance) - int(main_price) ,
                    deposit_date=factor_obj.persian_date(),
                    dis=f"پرداخت مبلغ  با چک فاکتور   {factor_obj.order_code}"


                )
                new_deposit.save()
                factor_obj.costumer.deposits.add(new_deposit)
            return Response(status=status.HTTP_201_CREATED,data={"message":"صورت حساب مورد نظر با موفقیت ثبت شد"})
            

@method_decorator(csrf_exempt, name='dispatch')
class FactorManageMent(APIView):
    def get(self,request):
      
        factors = Order.objects.all().order_by("-id")
        convet_fake_id(factors)
        data = FactorListSerializer(factors,many=True).data
       

        return Response(status=status.HTTP_200_OK,data={"data":data})
    

  
    def post (self,request):
        main_data = request.data
       
        for item in main_data:
            try:
                data=json.loads(item)
            except:
                data=request.data
       
            factor_date= data['factor_date']
            order_code=data['order_code']
            select_costumer=data['select_costumer']
            peyment_type=data['peyment_type']
            products=data['products']
            dis=data['dis']
    

            if select_costumer is None:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"message":"لطفا مشتری مورد نظر خود را انتخاب کنید"})
            for product in products:
                if product['product_id'] is None:
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"message":"محصولی انتخاب نکردید "})
            product_objs = []


            main_date = jalali_converter_only_date(datetime.datetime.now().date())
            try: 
                date = factor_date.split('-')
                main_date=f"{date[0]}/{date[1]}/{date[2]}"
                
            except:
                pass
            costumer_obj = Costumer.objects.get(id=select_costumer)

            new_order = Order(
                costumer=costumer_obj,
                peyment_type=peyment_type,
                order_code=order_code,
                created=main_date,

                dis=dis,
            )
            new_order.save()
            # new_order.products.set(product_objs)
            for product in products:
                product_obj = Product.objects.get(id=product['product_id'])
                new_order_product =OrderProduct(
                    price=product['price'],
                    main_product=product_obj,
                    numbers=product['quantiy']

                )
                new_order_product.save()
                new_order.products.add(new_order_product)

            try:
                image_path=request.session['factor_image_path']
                file_name = os.path.basename(image_path)
                    

                new_order.image.save(file_name,open(image_path,'rb'))
                new_order.save()
                path = Path(image_path)
                if path.exists():
                        path.unlink()
                request.session['factor_image_path']=None
                        
            except:
                pass
        
        
            if costumer_obj.deposits.all():
                deposit_obj= costumer_obj.deposits.last()
                new_deposit = Deposit(
                    price_deposited=int(new_order.final_price()),
                    bestankar_price= 0,
                    balance=int(new_order.final_price()) + int(deposit_obj.balance),
                    deposit_date=new_order.persian_date(),
                    dis=f"ثبت فاکتور {new_order.order_code}"


                )
                new_deposit.save()
                costumer_obj.deposits.add(new_deposit)
            else:
                new_deposit = Deposit(
                    price_deposited=int(new_order.final_price()),
                    bestankar_price= 0,
                    balance=int(new_order.final_price()),
                    deposit_date=new_order.persian_date(),
                    dis=f"ثبت فاکتور {new_order.order_code}"


                )
                new_deposit.save()
                costumer_obj.deposits.add(new_deposit)
            if new_order.peyment_type == "نقد":
        
              
                try:
                    money_receiver= data['money_receiver']
                    bol= True
                except:
                    money_receiver=data['money_recaiver_ib7']
                    bol=False
                
                new_cash_peyment= ChashPeyment(
                    destination_pay=bol,
                    money_receiver = money_receiver,
                    card_numer_origin = data['card_numer_origin'],
                    card_name_origin = data['card_name_origin'],
                    amount = data['amount'],
                    discount=data['discount']
                )
                new_cash_peyment.save()
                new_order.cash_peyment_detail=new_cash_peyment
                new_order.save()
                if new_order.costumer.deposits.all():
                    deposit_obj= new_order.costumer.deposits.last()
                    new_deposit = Deposit(
                        price_deposited=0,
                        bestankar_price= new_cash_peyment.amount,
                        balance= int(deposit_obj.balance)-int(new_cash_peyment.amount) ,
                        deposit_date=new_order.persian_date(),
                        dis=f"پرداخت مبلغ فاکتور  {new_order.order_code}"


                    )
                    new_deposit.save()
                    new_order.costumer.deposits.add(new_deposit)
                tody_date = jalali_converter_only_date(datetime.datetime.now().date())
                list_date = tody_date.split('/')
                if new_cash_peyment.destination_pay:
                    url=f"http://jmwear.ir:800/ManagerDashbord/DepositStatusTailor/{new_cash_peyment.money_receiver}"
                    data_to_send={
                        "deposit_price":new_cash_peyment.amount,
                        "deposit_date":f"{list_date[0]}-{list_date[1]}-{list_date[2]}",
                        "card_name_origin":new_cash_peyment.card_name_origin,
                        "card_number_origin":new_cash_peyment.card_numer_origin,
                        "card_name_destination":"123",
                        "card_number_destinition":"132",
                        "dis":"ثبت واریزی از ib7",
                    }
                    response = requests.post(url=url,json=data_to_send)
                    print(response)
                return Response(status=status.HTTP_201_CREATED,data={"message":"صورت حساب مورد نظر با موفقیت ثبت شد"})
            elif new_order.peyment_type == "چک":
               
                main_date = ""
                try:
                    list_date = data['dead_time'].split("-")
                    main_date = f"{list_date[0]}/{list_date[1]}/{list_date[2]}"
                except:
                    pass
                print(data['prepeyment'],"!42")
                print(data['discount'],"!42")
                print(data['amount'],"!asd")
                new_check_peyment = CheckPeyment(
                    amount=data['amount'],
                    check_owner=data['owner'],
                    prepeyment=data['prepeyment'],
                    dead_time=main_date,
                    check_recaiver=data['check_recaiver'],
                    discount=data['discount']
                )
                new_check_peyment.save()
                new_order.check_peyment_detail=new_check_peyment
                new_order.save()
                try:
                    image_path=request.session['check_image_path']
                    file_name = os.path.basename(image_path)
                        

                    new_check_peyment.image.save(file_name,open(image_path,'rb'))
                    new_check_peyment.save()
                    path = Path(image_path)
                    if path.exists():
                            path.unlink()
                    request.session['check_image_path']=None
                            
                except:
                    pass
                
                main_price = int(new_check_peyment.amount) + int(new_check_peyment.prepeyment)
                if new_order.costumer.deposits.all():
                    deposit_obj= new_order.costumer.deposits.last()
                    new_deposit = Deposit(
                        price_deposited=0,
                        bestankar_price= main_price,
                        balance=int(deposit_obj.balance) - int(main_price) ,
                        deposit_date=new_order.persian_date(),
                        dis=f"پرداخت مبلغ  با چک فاکتور   {new_order.order_code}"


                    )
                    new_deposit.save()
                    new_order.costumer.deposits.add(new_deposit)
                return Response(status=status.HTTP_201_CREATED,data={"message":"صورت حساب مورد نظر با موفقیت ثبت شد"})
            elif new_order.peyment_type == "اقساط":
                    
                    discount = data['discount']
                    prepayment = data['prepayment']
                    prepayment_date = data['prepayment_date']
                   
                    number_of_peyments=data['number_of_peyments']
                  
                    new_order.pish_pardakht = prepayment
                    new_order.takhfif = discount
                    new_order.prepeyment_date=prepayment_date
                    new_order.save()

                    main_total_price = 0
                    for product in new_order.products.all():
                        main_total_price+= int(product.price) * int(product.numbers)
  
                    total_price_after_discount= main_total_price - (int(new_order.takhfif) + int(new_order.pish_pardakht))
                    peyment_list =[]
                    for item in range(1,int(number_of_peyments)+1):
                        new_peyment = PeymendDate(price = total_price_after_discount/int(number_of_peyments))
                        new_peyment.save()
                        peyment_list.append(
                            new_peyment
                        )

                    new_order.instal_ments.set(peyment_list)
                    return Response(status= status.HTTP_200_OK,data={"message":"صورت حساب مورد نظر با موفقیت ثبت شد","redirect_url":f"/InstallMent/CreatePeyment/{new_order.id}"})
            else:
                return Response(status=status.HTTP_201_CREATED,data={"peyment_type":new_order.peyment_type,"factor_id":new_order.id,"total_price":new_order.total_price_method()})
      
    def put (self,request,factor_id):
        factor_obj = Order.objects.get(id=factor_id)
        data= request.data
        
        select_costumer=data['select_costumer']
        products = data['products']
        factor_date=data['factor_date']
        if select_costumer is None:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"message":"لطفا مشتری مورد نظر خود را انتخاب کنید"})
        for product in products:
            if product['product_id'] is None:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"message":"محصولی انتخاب نکردید "})

        for pro in factor_obj.products.all():
            pro.delete()

        main_date = ""
       
        try:
            date_split= factor_date.split("-")
            main_date = f"{date_split[0]}/{date_split[1]}/{date_split[2]}"
        except:
            pass
        for new_pro in products:
            product_main_obj = Product.objects.get(id=new_pro['product_id'])
            new_order_pro = OrderProduct(
                main_product=product_main_obj,
                price =new_pro['price'],
                numbers= new_pro['quantiy']

            )
            new_order_pro.save()
            factor_obj.products.add(new_order_pro)

        factor_obj.dis=data['dis']
        factor_obj.created =main_date
        factor_obj.save()
        return Response(status=status.HTTP_200_OK)
    
    def delete(self,request,factor_id):
        factor = Order.objects.get(id=factor_id)
        factor.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def create_factor_new(request):
        data= request.GET
      
        costumer_id=request.GET.get("costumer")
        cont = 0
        for item in data:
            if cont == 1:
              
            
                
                main_dataa= json.loads(item)
                
                product_list =main_dataa['products']
                discription=main_dataa['discription']
             
                
            

                product_objs = []
                total_price = 0
                for product in product_list:
                    product_obj= Product.objects.get(id=product['id'])
                    
                    new_product_obj =OrderProduct(
                        main_product=product_obj,
                        title = product_obj.title,
                        numbers = product['quantity'],
                        price = product_obj.price,
                    )

                    total_price+= int (product['quantity']) * int (product_obj.price)
                    new_product_obj.save()   
                    product_objs.append(new_product_obj)
                random_number = random.randint(100000, 999999)
                new_factor = Order(
                    costumer= Costumer.objects.get(id= costumer_id),
                    order_code= f"E_{random_number}",
                    dis = discription

                )
                new_factor.save()
                new_factor.products.set(product_objs)
                costumer_obj= Costumer.objects.get(id=costumer_id)
                if costumer_obj.deposits.all():
                    deposit_obj= costumer_obj.deposits.last()
                    new_deposit = Deposit(
                        price_deposited=int(new_factor.final_price()),
                        bestankar_price= 0,
                        balance=int(new_factor.final_price()) + int(deposit_obj.balance),
                        deposit_date=new_factor.persian_date(),
                        dis=f"ثبت فاکتور {new_factor.order_code}"


                    )
                    new_deposit.save()
                    costumer_obj.deposits.add(new_deposit)
                else:
                    new_deposit = Deposit(
                        price_deposited=int(new_factor.final_price()),
                        bestankar_price= 0,
                        balance=int(new_factor.final_price()),
                        deposit_date=new_factor.persian_date(),
                        dis=f"ثبت فاکتور {new_factor.order_code}"


                    )
                    new_deposit.save()
                    costumer_obj.deposits.add(new_deposit)
                
                try:
                    image_path=request.session['factor_image_path']
                    file_name = os.path.basename(image_path)
                

                    new_factor.image.save(file_name,open(image_path,'rb'))
                    new_factor.save()
                    path = Path(image_path)
                    if path.exists():
                            path.unlink()
                    request.session['factor_image_path']=None
                    
                except:
                    pass

                 
            else:
                cont+=1
        return Response(status=status.HTTP_201_CREATED,data={"factor_id":new_factor.id,"total_price":total_price})
  


@api_view(['POST'])
def create_time_order (request):
    data= request.data
    discount = data['discount']
    prepayment = data['prepayment']
    prepayment_date = data['prepayment_date']
    factorid=data['factorid']
    number_of_peyments=data['number_of_peyments']

    factor_obj = Order.objects.get(id=factorid)
    factor_obj.pish_pardakht = prepayment
    factor_obj.takhfif = discount
    factor_obj.prepeyment_date=prepayment_date
    factor_obj.save()

    main_total_price = 0
    for product in factor_obj.products.all():
        main_total_price+= int(product.price) * int(product.numbers)

    total_price_after_discount= main_total_price - (int(factor_obj.takhfif) + int(factor_obj.pish_pardakht))
    peyment_list =[]
    for item in range(1,int(number_of_peyments)+1):
        new_peyment = PeymendDate(price = total_price_after_discount/int(number_of_peyments))
        new_peyment.save()
        peyment_list.append(
            new_peyment
        )

    factor_obj.instal_ments.set(peyment_list)
    return Response(status= status.HTTP_200_OK,data={"message":"صورت حساب مورد نظر با موفقیت ثبت شد","redirect_url":f"/InstallMent/CreatePeyment/{factor_obj.id}"})
    

        


                
def factor_detail_page(request,factor_id):
    factor_obj = Order.objects.get(id=factor_id)



 


    context = {
        
        "factor_obj":factor_obj,
   
       
    }
    count =1
    peyment_objs = []
    for peyment in factor_obj.instal_ments.all():
        peyment_objs.append({
            "id":peyment.id,
            "year":peyment.year,
            'month':peyment.month,
            'day':peyment.day,
            'price':peyment.price,
            'is_payed':peyment.is_payed,
            'peyed_date':peyment.peyed_date,
            "count":count,
        })
        count+=1
    context['peyment_objs']=peyment_objs
    return render(request,"InstallMent/FactorManageMent/FactorDetail.html",context)
@api_view(['GET'])
def is_payed_peyments(request,peyment_id):
    status_payed = request.GET.get("status")
    peyment_obj = PeymendDate.objects.get(id=peyment_id)

    if status_payed == True:
        peyment_obj.is_payed=True
        peyment_obj.save()
    else:
        peyment_obj.is_payed=True
        peyment_obj.save()
    return Response(status=status.HTTP_200_OK)


def create_peyment_page(request,factor_id):
    context = {}
    try:
        factor_obj = Order.objects.get(id=factor_id)
        context['factor_obj'] = factor_obj
    except:
        pass
    peyment_obj_list = []
    count = 1
    for peyment in factor_obj.instal_ments.all():
        dic={
            "id":peyment.id,
            "price":peyment.price,
            "count":count
        }
        peyment_obj_list.append(dic)
        count+=1

    context['peyment_objs'] = peyment_obj_list

    return render(request,"InstallMent/FactorManageMent/CreatePeyment.html",context)


@api_view(['POST'])
def create_peyment_date(request):
    
    data= request.data
    peyment_ids= request.data.getlist("peyment_id")
    for peyment_id in peyment_ids:
        peyment_data= data[f'prepayment_date_{peyment_id}']
        list_peyment_date = peyment_data.split("-")
        peyment_obj = PeymendDate.objects.get(id=peyment_id)
        peyment_obj.year = list_peyment_date[0]
        peyment_obj.month= list_peyment_date[1]
        peyment_obj.day = list_peyment_date[2]
        peyment_obj.save()

    return Response(status=status.HTTP_201_CREATED,data={"message":"تاریخ اقساط با موفقیت ثبت شد","redirect_url":"/InstallMent/FactorList"})


@api_view(['POST'])
def create_payed_peyment(request,peyment_id):
    data = request.data
    prepayment_date=data[f'prepayment_date{peyment_id}']
    peyment_obj = PeymendDate.objects.get(id=peyment_id)
    list_date = prepayment_date.split("-")
    peyment_obj.peyed_date=f"{list_date[0]}/{list_date[1]}/{list_date[2]}"
    peyment_obj.is_payed=True
    peyment_obj.save()
    return Response(status=status.HTTP_202_ACCEPTED)



def filter_factor_costumer(request,costumer_id):
    costumer_obj = Costumer.objects.get(id= costumer_id)
    price_of_payed=0
    price_of_debit=0
    price_of_orders=0
    

    for factor in costumer_obj.order_costumer.all():
        price_of_orders+=factor.final_price()
        price_of_payed+=factor.factor_paid()
        price_of_debit+=factor.factor_debt()
        
    context={
        "costumer_obj":Costumer.objects.get(id=costumer_id),
        "costumer_id":costumer_id,
        "price_of_payed":price_of_payed,
        "price_of_debit":price_of_debit,
        "price_of_orders":price_of_orders,
        
    }
    return render(request,"InstallMent/CostumerManageMent/filter_factors.html",context)



class FilterFactorManageMent(APIView):
    def get(self,request,costumer_id):
        
        costumer_obj= Costumer.objects.get(id=costumer_id)
        factors= costumer_obj.order_costumer.all()
 
        obj_list = [] 
        for factor in factors:
            dic = {}
            dic['id'] = factor.id
            dic['code'] = factor.order_code
            dic['kol_price'] = factor.final_price()
            dic['deb'] = factor.factor_debt()
            dic['paid'] = factor.factor_paid()
            obj_list.append(dic)
        
        return Response(status=status.HTTP_200_OK,data={"data":obj_list})
    
    
def serch_factor_page(request):
    return render (request,"InstallMent/SerchFactorManageMent/SerchFactor.html")


class CerchFactorPeyment(APIView):
    def get (self,request):
       
        serch_word = request.GET.get("serch_word")
  
        main_date = serch_word.split("-")
        peyments= PeymendDate.objects.filter(is_payed=False)
    
        data_send=[]
        for peyment in peyments:

            if peyment.year == main_date[0] and peyment.month == main_date[1] and peyment.day == main_date[2]:
          
                dic={}
                dic['peyment_date']= f"{peyment.year}/{peyment.month}/{peyment.day}"
                dic['price']=peyment.price
                order = peyment.order_peyment.all()
                dic['status'] = False
                if peyment.is_payed:
                    dic['status'] = True

                
                dic['costumer_name']=order[0].costumer.firstname + " " + order[0].costumer.lastname
                dic['costumer_id'] = order[0].costumer.id
                dic['order_code'] = order[0].order_code
                dic['order_id'] = order[0].id
                dic['phone_num']=order[0].costumer.phonenumber
                dic['order_price']= order[0].final_price()
              
                data_send.append(dic)
        if data_send:
    
            return Response(status=status.HTTP_200_OK,data={"data":data_send})
        else:
            return Response(status=status.HTTP_404_NOT_FOUND,data={"message":  f"  در تاریخ   {main_date[0]}/{main_date[1]}/{main_date[2]} چیزی پیدا نشد"})
        
        


def create_city(request):
    with open ("states.json",'r', errors='ignore', encoding='UTF-8') as json_data:
        data = json.load(json_data)
        for state in data:
            new_state =State(
                name = state['name'],
                code =state['code']
            )
            new_state.save()
            city_list= []
            for city in state['citys']:
                new_city= City(
                    name = city['name'],
                    code = city['code']
                )
                new_city.save()
                city_list.append(new_city)
            new_state.cities.set(city_list)
    return JsonResponse({})


@api_view(['GET'])
def state_detail(request):
    if request.method == "GET":
        state_code = request.GET.get("state_code")
        state_obj = State.objects.get(code=state_code)

        cities=[]
        for city in state_obj.cities.all():
            cities.append({
                "name":city.name,
                "code":city.code
            })
        return Response(status=status.HTTP_200_OK,data=cities)
    
    
@api_view(['GET'])
def change_status_user(request,user_id):
    user_obj = UserAccount.objects.get(id=user_id)
    statuss=request.GET.get("status")
    if statuss == "true":
        user_obj.is_active= True
        user_obj.save()
    else:
        user_obj.is_active= False
        user_obj.save()
        
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def main_product_list(request):
    if request.GET:
        product_objs = Product.objects.all()
        product_serializer=MainProductSerializer(product_objs,many=True).data
    
        return Response(status=status.HTTP_200_OK,data={"data":product_serializer})
    
def deposits_costumer(request,costumer_id):
    costumer_obj=Costumer.objects.get(id=costumer_id)
    response = requests.get(url="http://jmwear.ir:800/ManagerDashbord/all_tailors")
 
    return render(request,"InstallMent/CostumerManageMent/DepositStatus.html",{"costumer_obj":costumer_obj,"tailors":response.json()})

@method_decorator(csrf_exempt, name='dispatch')
class DepositManageMent(APIView):
    def get(self,request,costumer_id):
        costumer_obj= Costumer.objects.get(id=costumer_id)
        convet_fake_id(costumer_obj.deposits.all().order_by('-deposit_date'))
        Data = DepositSerializer(costumer_obj.deposits.all(),many=True).data
        return Response(status=status.HTTP_200_OK,data={"data":Data})
    
    def post(self,request,costumer_id):
        
        costumer_obj= Costumer.objects.get(id=costumer_id)
        data= request.data
        if data['peyment_type'] == "نقد":
            try :
                money_recaiver = data['money_receiver']
                bol=True
            except:
                money_recaiver=data['money_recaiver_ib7']
                bol=False
            

            deposit_price= data['deposit_price']
            deposit_date= data['deposit_date']
        
            dis= data['dis']
            date_split = deposit_date.split("-")
            main_date = f"{date_split[0]}/{date_split[1]}/{date_split[2]}"
            new_depoit_obj = Deposit(
                price_deposited=deposit_price,
                dis=dis,

                deposit_date=main_date
            )


            if costumer_obj.deposits.all():
                deposit_obj = costumer_obj.deposits.last()
                new_depoit_obj.bestankar_price=deposit_price
                new_depoit_obj.price_deposited=0
                new_depoit_obj.balance=int(deposit_obj.balance) - int(deposit_price)
                new_depoit_obj.save()
                costumer_obj.deposits.add(new_depoit_obj)
            else:
                factor_cos_prices = costumer_obj.total_factor_price()
                deposit_obj = costumer_obj.deposits.last()
                new_depoit_obj.bestankar_price=deposit_price
                new_depoit_obj.price_deposited=0
                new_depoit_obj.balance=factor_cos_prices - int(deposit_price)
                new_depoit_obj.save()
                costumer_obj.deposits.add(new_depoit_obj)
            if bol:
                new_depoit_obj.money_recaiver_jmwear = money_recaiver
                new_depoit_obj.money_recaive_type=True
                url=f"http://jmwear.ir:800/ManagerDashbord/DepositStatusTailor/{money_recaiver}"
                
                data_to_send={
                    "deposit_price":deposit_price,
                    "deposit_date":deposit_date,
                    "card_name_origin":"213",
                    "card_number_origin":"654",
                    "card_name_destination":"123",
                    "card_number_destinition":"132",
                    "dis":"ثبت واریزی از ib7",
                }
                if not deposit_date  :
                    today_date_pr = jalali_converter_only_date(datetime.datetime.now().date())
                    split_date = today_date_pr.split("/")
                    data_to_send['deposit_date']=f"{split_date[0]}-{split_date[1]}-{split_date[2]}"
                response = requests.post(url=url,json=data_to_send)
            else:
                new_depoit_obj.money_recaive_type=False
                new_depoit_obj.moeny_recaiver_ib7 = money_recaiver
        
            return Response(status=status.HTTP_201_CREATED)
        else:
   

            deposit_price= data['deposit_price']
            deposit_date= data['deposit_date']
            owner =data ['owner']
            check_recaiver =data ['check_recaiver']
            dead_time =data ['dead_time']
            dis= data['dis']
            date_split = deposit_date.split("-")
            main_date = f"{date_split[0]}/{date_split[1]}/{date_split[2]}"
            new_depoit_obj = Deposit(
                price_deposited=deposit_price,
                dis=dis,

                deposit_date=main_date
            )
            
            new_check_peyment = CheckPeyment(
                amount=deposit_price,
                check_owner=owner,
                check_recaiver=check_recaiver,
                dead_time=dead_time,
            )
            try:
                image_path=request.session['image_check_pey_dep']
                file_name = os.path.basename(image_path)
                    

                new_check_peyment.image.save(file_name,open(image_path,'rb'))
                new_check_peyment.save()
                path = Path(image_path)
                if path.exists():
                        path.unlink()
                request.session['image_check_pey_dep']=None
                        
            except:
                pass
            new_check_peyment.save()
            new_depoit_obj.check_peyment=new_check_peyment
                
            if costumer_obj.deposits.all():
                deposit_obj = costumer_obj.deposits.last()
                new_depoit_obj.bestankar_price=deposit_price
                new_depoit_obj.price_deposited=0
                new_depoit_obj.balance=int(deposit_obj.balance) - int(deposit_price)
                new_depoit_obj.save()
                costumer_obj.deposits.add(new_depoit_obj)
            else:
                factor_cos_prices = costumer_obj.total_factor_price()
                deposit_obj = costumer_obj.deposits.last()
                new_depoit_obj.bestankar_price=deposit_price
                new_depoit_obj.price_deposited=0
                new_depoit_obj.balance=factor_cos_prices - int(deposit_price)
                new_depoit_obj.save()
                costumer_obj.deposits.add(new_depoit_obj)
            return Response(status=status.HTTP_201_CREATED)
    def put (self,request,dep_id,costumer_id):
        data= request.data
        costumer_obj= Costumer.objects.get(id=costumer_id)
        last_depositeedd = costumer_obj.deposits.last()
  
        
        if data['deposited']:

            deposited=data['deposited']

            deposit_date= data['deposit_date']
            card_number_origin= data['card_number_origin']
            card_number_destinition= data['card_number_destinition']
            dis= data['dis']
            main_date=""
            
            try:
                date_split = deposit_date.split("-")
                main_date = f"{date_split[0]}/{date_split[1]}/{date_split[2]}"
            except:
                pass
            deposit_obj=Deposit.objects.get(id=dep_id)
            khalesi = int(deposited)-int (deposit_obj.price_deposited) 
            deposit_obj.price_deposited=int(deposited)
            deposit_obj.balance = int(deposit_obj.balance) + khalesi
            last_depositeedd.balance = int(last_depositeedd.balance) + int(khalesi)
            deposit_obj.deposit_date=main_date
            deposit_obj.dis=dis
            deposit_obj.card_number_origin=card_number_origin
            deposit_obj.card_number_destination=card_number_destinition
            deposit_obj.save()
            last_depositeedd.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        elif data['predeposit']:
            predeposit=data['predeposit']
            deposit_date= data['deposit_date']
            card_number_origin= data['card_number_origin']
            card_number_destinition= data['card_number_destinition']
            dis= data['dis']
            main_date=""
            if deposit_date:
                date_split = deposit_date.split("-")
                main_date = f"{date_split[0]}/{date_split[1]}/{date_split[2]}"
            deposit_obj=Deposit.objects.get(id=dep_id)
            khalesi = int(predeposit)-int (deposit_obj.bestankar_price)
            deposit_obj.balance = int(deposit_obj.balance) -     khalesi
            last_depositeedd.balance = int(last_depositeedd.balance)-int(khalesi)
            deposit_obj.bestankar_price = int(predeposit)
            deposit_obj.deposit_date=main_date
            deposit_obj.dis=dis
            deposit_obj.card_number_origin=card_number_origin
            deposit_obj.card_number_destination=card_number_destinition
            deposit_obj.save()
            last_depositeedd.save()
            return Response(status=status.HTTP_202_ACCEPTED)

      
    
    def delete (self,request,costumer_id):
        deposit_obj=Deposit.objects.get(id=costumer_id)
        deposit_obj.delete()
        return Response(status=status.HTTP_200_OK)
    

@csrf_exempt
@api_view(['DELETE'])
def delete_deposit  (request,deposit_id):
    deposit_obj=Deposit.objects.get(id=deposit_id)
    deposit_obj.delete()
    return Response(status=status.HTTP_200_OK)


def handle_uploaded_file_galery_image(file):
    with open('session_images/Costumer_docs/' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)


class CreateDocumentCostumerManageMent(APIView):
    def post (self,request):
            
            image_file = handle_uploaded_file_galery_image(request.FILES.get("file"))
            try:
                
                ses=request.session.get('docs_customer_imagess')
                main_list=[]
                for item in ses:
                    main_list.append(item)
                main_list.append({'filename':request.FILES.get("file").name,"path":'session_images/Costumer_docs/' + request.FILES.get("file").name})
                request.session['docs_customer_imagess']=main_list
                # ses.append({'filename':request.FILES.get("file").name,"path":'session_images/galery_images/' + request.FILES.get("file").name})
            except:

                
                request.session['docs_customer_imagess']=[{'filename':request.FILES.get("file").name,"path":'session_images/Costumer_docs/' + request.FILES.get("file").name}]

            return Response(status=status.HTTP_200_OK)
    def delete(self,request):
        data =request.data
       

         
        file_name = data['filename']
        main_list=[]
        
        for item in request.session['docs_customer_imagess']:
                
            if item['filename'] == file_name:
                
                path = Path(item['path'])
                if path.exists():
                    path.unlink()
            else:
                main_list.append(item)
            
            request.session['docs_customer_imagess']=main_list
            
        return Response(status=status.HTTP_200_OK)
    def post(self,request,costumer_id):
        costumer_obj=Costumer.objects.get(id=costumer_id)
        file= request.FILES.get('file')
        new_doc= Document(
            file_image=file
        )
        new_doc.save()
        costumer_obj.documnent.add(new_doc)
        try:
                
            ses=request.session.get('doc_image_editt')
            main_list=[]
            for item in ses:
                main_list.append(item)
            main_list.append({'filename':request.FILES.get("file").name,"id":new_doc.id})
            request.session['doc_image_editt']=main_list
        
        except:

                
            request.session['doc_image_editt']=[{'filename':request.FILES.get("file").name,"id":new_doc.id}]
        return Response(status=status.HTTP_200_OK,data={"image_id":new_doc.id,"url":new_doc.file_image.url})
    def delete(self,request,costumer_id):
        file_name = request.data['filename']
       
        main_list=[]
        id_im= 0
        for item in request.session['doc_image_editt']:
            if item['filename']==file_name:
                Document.objects.get(id=item['id']).delete()
                id_im=item['id']
            else:
                main_list.append(item)
        request.session['doc_image_editt']=main_list
        return Response(status=status.HTTP_200_OK,data={"image_id":id_im})



@api_view(['DELETE'])
def delete_image_doc (request,doc_id):
    doc= Document.objects.get(id=doc_id)
    doc.delete()
    return Response(status=status.HTTP_200_OK)
    

def handle_uploaded_file(file):
    with open('session_images/FactorImage/' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

class FactorImageManageMent(APIView):
    def post(self,request):
        image_file=handle_uploaded_file(request.FILES.get("file"))
        
    
        
        request.session['factor_image_path'] = 'session_images/FactorImage/' + request.FILES['file'].name
        return Response(status=status.HTTP_200_OK)
    def delete(self,request):
        image_path=request.session['factor_image_path']

        path = Path(image_path)
        if path.exists():
            path.unlink()

            


        return Response(status=status.HTTP_200_OK)
    

@api_view(['GET'])
def costumer_detail(request,costumer_id):
    costumer_obj=Costumer.objects.get(id=costumer_id)

    data={
        "fullname":f"{costumer_obj.firstname}  {costumer_obj.lastname}",
        "phone":costumer_obj.phonenumber,
      

        "state_city":f"{costumer_obj.get_state()}/{costumer_obj.get_city()}",
      
    }
    return Response(status=status.HTTP_200_OK,data=data)


@api_view(['GET'])
def product_detail(request,product_id):
    product_obj=Product.objects.get(id=product_id)


    return Response(status=status.HTTP_200_OK,data={"price":product_obj.price})





def upload_file(file,path):
    with open(f'session_images/{path}/' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
class CheckImageManager(APIView):
    def post(self,request):
        image_file=upload_file(request.FILES.get("file"),"checkimages")
        
    
        
        request.session['check_image_path'] = 'session_images/checkimages/' + request.FILES['file'].name
        return Response(status=status.HTTP_200_OK)
    def delete(self,request):
        image_path=request.session['check_image_path']

        path = Path(image_path)
        if path.exists():
            path.unlink()

            


        return Response(status=status.HTTP_200_OK)
    


def bank_acc_page(request):
    bank_objs = BankAccount.objects.all()
    return render(request,"InstallMent/BankAccount.html",{"bank_objs":bank_objs})


class BankAccountManageMent(APIView):
    def get(self,request):
        bank_obj = BankAccount.objects.all()
        data = []
        for obj in bank_obj:
            data.append({
                "id":obj.id,
                "title":obj.title,
                "account_number":obj.account_number,
                "account_owner":obj.account_owner,
                
            })
        return Response(status=status.HTTP_200_OK,data={"data":data})

    def post (self,request):
        data= request.data

        title = data['title']
        account_owner = data['account_owner']
        account_number = data['account_number']
        new_bankacc= BankAccount(
            title=title,
            account_number=account_number,
            account_owner=account_owner,
        )        
        new_bankacc.save()
        return Response(status=status.HTTP_201_CREATED,data={"message":"Fuck"})
    def put (self,request,bankacc_id):
        bank_obj = get_object_or_404(BankAccount,id=bankacc_id)
        data =request.data
        
        title = data['title']
        account_owner = data['account_owner']
        account_number = data['account_number']
        bank_obj.title= title
        bank_obj.account_owner= account_owner
        bank_obj.account_number= account_number
        bank_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    def delete (self,request,bankacc_id):
        bank_obj = get_object_or_404(BankAccount,id=bankacc_id)
        bank_obj.delete()
        return Response(status= status.HTTP_200_OK)
    


@api_view(['GET'])
def peyment_method (request,type):
    if int(type) == 2 :
        response = requests.get(url='http://jmwear.ir:800/ManagerDashbord/all_tailors')
       
        return Response(status=status.HTTP_202_ACCEPTED,data=response.json())
    else:
        bank_accs= BankAccount.objects.all()
        data = []
        for acc in bank_accs:
            data.append({
                "id":acc.id,
                "title":acc.title
            }) 
        return Response(status=status.HTTP_200_OK,data=data)
    
    
    
def edit_factor_page(request,factor_id):
    factor_obj= get_object_or_404(Order,id=factor_id)
    
    return render(request,"InstallMent/FactorManageMent/EditFactor.html",{"factor_obj":factor_obj,
                                                                          "costumers":Costumer.objects.all(),
                                                                          "products":Product.objects.all()})
class ChangeFactorImage(APIView):
    def post(self, request,factor_id):
        file = request.FILES.get("file")
        factor_obj= Order.objects.get(id=factor_id)
        factor_obj.image=file
        factor_obj.save()
        return Response(status=status.HTTP_201_CREATED,data={"url":factor_obj.image.url,"id":factor_obj.id})
    def delete (self,request,factor_id):
        factor_obj = Order.objects.get(id=factor_id)
        factor_obj.image.delete()
        return Response(status=status.HTTP_200_OK)
    


@api_view(['GET'])
def create_factor_code(request):
    word = request.GET.get("word")

    return Response(status=status.HTTP_200_OK,data={"code":f"{word}_{random.randint(100000, 999999)}"})

def handle_uploaded_file(file):
    with open('session_images/CheckImagePeyDeps/' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
class ImageChekPeyDeposit(APIView):
    def post(self,request):
        image_file=handle_uploaded_file(request.FILES.get("file"))
        
    
        
        request.session['image_check_pey_dep'] = 'session_images/CheckImagePeyDeps/' + request.FILES['file'].name
        return Response(status=status.HTTP_200_OK)
    def delete(self,request):
        image_path=request.session['image_check_pey_dep']

        path = Path(image_path)
        if path.exists():
            path.unlink()

            


        return Response(status=status.HTTP_200_OK)


def check_peyment_page(request):
    chek_objs=CheckPeyment.objects.all()
    return render(request,"InstallMent/FactorManageMent/CheckPeyList.html",{"chek_objs":chek_objs})


class CheckPeymentManager(APIView):
    def get(self,request):
        check_objs = CheckPeyment.objects.all()
        main_data=[]
        for check_obj in check_objs:
            dic ={
                "id":check_obj.id,
                "amount":check_obj.amount,
                "image":"",
                "check_owner":check_obj.check_owner,
                "check_recaiver":check_obj.check_recaiver,
                "dead_time":check_obj.dead_time,
            }
            if check_obj.image:
                dic['image'] = check_obj.image.url
                
            main_data.append(dic)
        return Response(status=status.HTTP_200_OK,data={"data":main_data})
    def put (self,request,check_id):

        data = request.data
        check_obj=CheckPeyment.objects.get(id=check_id)
        amount=data['amount']
        check_owner=data['check_owner']
        check_recaiver=data['check_recaiver']
        check_obj.amount=amount
        check_obj.check_owner=check_owner
        check_obj.check_recaiver=check_recaiver
        check_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    


def postsms_list_page(request):
    context  = {}
    queryset = PostSmsMain.objects.all()
    context['queryset'] = queryset
    factors = Order.objects.all()
    context['factors'] = factors
    return render(request,"InstallMent/FactorManageMent/MarsoleSms.html",context)


class PostSmsManageMent(APIView):
    def get(self,request):
        query_set = PostSmsMain.objects.all().order_by('-id')
        convet_fake_id(query_set)
        main_data = []
        for item in query_set:
            main_data.append({
                "fake_id":item.fake_id,
                "id":item.id,
                "firstname":item.firstname,
                'lastname':item.lastname,
                'marsole_code':item.marsole_code,
                'persian_date':item.persian_date(),
            
            })

        return Response(status=status.HTTP_200_OK,data={"data":main_data})
    def post (self,request):
        data = request.data
        factor_id= data['factor_id']
        factor_obj= Order.objects.get(id=factor_id)
        factor_obj.marsole_code=data['marsole_code']
        factor_obj.save()
        new_postsms = PostSmsMain(
            firstname = data['firstname'],
            lastname = data['lastname'],
            marsole_code = data['marsole_code'],
            phone_number = data['phone_number'],
            post_type= data['post_type']
        )
        new_postsms.save()
        # fullname = new_postsms.firstname + " " + new_postsms.lastname
        # marsole = new_postsms.marsole_code
        # send_sms(fullname,marsole,new_postsms.phone_number,new_postsms.post_type)
        return Response(status=status.HTTP_201_CREATED,data={"message":"سفارش مورد نظر با موفقیت ثبت شد"})
    def put (self,request,post_id):
        data=request.data
        post_obj = PostSmsMain.objects.get(id=post_id)
        post_obj.firstname= data['firstname']
        post_obj.lastname= data['lastname']
        post_obj.marsole_code= data['marsole_code']
        post_obj.phone_number= data['phone_number']
        post_obj.post_type= data['post_type']
        post_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED,data={"message":"با موفقیت آپدیت شد"})
    def delete(self,request,post_id):
        post_obj = PostSmsMain.objects.get(id=post_id)
        post_obj.delete()
        return Response(status=status.HTTP_200_OK,data={"message":"با موفقیت حذف شد"})


@api_view(['GET'])
def send_sms_post(request,post_id):
    post_obj= PostSmsMain.objects.get(id=post_id)
    fullname = post_obj.firstname + " " + post_obj.lastname
    marsole = post_obj.marsole_code
    send_sms(fullname,marsole,post_obj.phone_number,post_obj.post_type)
    return Response(status=status.HTTP_202_ACCEPTED,data={"message":"پیامک با موفقیت ارسال شد"})
from django.shortcuts import render,redirect
from rest_framework import status
from InstallMent.models import City,State
from ShopManageMent.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ShopManageMent.models import *
from rest_framework.views import APIView
from .smsotp import send_sms
from UserManageMent.models import UserAccount
from rest_framework.authtoken.models import Token
from NetworkerPanel.models import Networker
from django.contrib.auth import login,authenticate
from django.contrib.auth.decorators import login_required
import random
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from NetworkerPanel.models import *
from datetime import timedelta
from ShopManageMent.models import ReturnTerms,HowToBuy,TermsAndConditions,WhyUs,AbutUs,TitleQuestion
def base_shop(request):
    return render(request, 'ShopBase.html')


def product_detail_page(request,product_code):
  
    product_obj = Product.objects.get(product_code=product_code)
    product_same_list=[]
    for category in product_obj.category.all():
        for product in category.product_category.all():
            product_same_list.append(product)
    inventory_data=[]
    count = 0
    size_selected = []

    for inventory in product_obj.inventory.all():
        if count == 0:
            color_dic={
                "color_id":inventory.color.id,
                "color_name":inventory.color.name,
                "color_code":inventory.color.color_code,
                "selected":True,
                "inv_id":inventory.id,
                "sizes":[]

            }
            
            for size_count in inventory.count_inventory.all():
                dic_size_count ={
                    "size_id":size_count.size.id,
                    "size_name":size_count.size.name,
                    "count_id":size_count.id,
                    
                }
                size_selected.append(dic_size_count)
            count = 1
            inventory_data.append(color_dic)
        else:
            color_dic={
                "color_id":inventory.color.id,
                "color_name":inventory.color.name,
                "color_code":inventory.color.color_code,
                "selected":False,
                "inv_id":inventory.id,
          

            }
            inventory_data.append(color_dic)
    
    return render(request,"Shop/ProductDetail.html",{"product_obj":product_obj,"inventory_data":product_obj.inventory.all(),"size_selected":size_selected,"product_same_list":product_same_list})





@api_view(['GET'])
def get_size_by_color(request,product_code):
    product_obj =Product.objects.get(product_code=product_code)
    data = request.GET
    print(data)
    color_id= data.get("color_id")
    size_data= []
    for inv in product_obj.inventory.all():
        if inv.color.id == int(color_id):
            for size_count in inv.count_inventory.all():
                dic_size_count ={
                    "size_id":size_count.size.id,
                    "size_name":size_count.size.name,
                    "count_id":size_count.id,
                    
                }
                size_data.append(dic_size_count)
        

        
    return Response(status=status.HTTP_200_OK,data=size_data)


def product_list_page(request,cat_id=None):
   
    product_list=[]
    typee_pro = 0
    if request.GET.get('type'):
        request_type = request.GET.get('type')
        typee_pro=request_type
      
        if int(request_type) == 3:
            cat_three = CategoryThree.objects.get(id=cat_id)
            for cat_two in cat_three.cat_2.all():
                for cat_one in cat_two.cat_1.all():
                    for product in cat_one.product_category.all():
                        product_list.append(product)
        elif int(request_type) == 4:
            filter_show=ShowFilter.objects.get(id=cat_id)
            for product in filter_show.product_show_filters.all():
                product_list.append(product)
        
        elif int(request_type) == 2:
            cat_two = CategoryTwo.objects.get(id=cat_id)
        
            for cat_one in cat_two.cat_1.all():
                for product in cat_one.product_category.all():
                    product_list.append(product)
        elif int(request_type) == 1:
            cat_one = CategoryOne.objects.get(id=cat_id)
        
            for product in cat_one.product_category.all():
                product_list.append(product)
    else:
        for product in Product.objects.all():
            product_list.append(product)
    paginator = Paginator(product_list, 10)  # Show 10 products per page
    page = request.GET.get('page')
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        products = paginator.page(1)
    except EmptyPage:
        # If page is out of range, deliver last page of results.
        products = paginator.page(paginator.num_pages)

    return render(request,"Shop/ProductList.html",{"product_list":products,"typee_pro":typee_pro})

def home_page(request):
    categorys = CategoryThree.objects.all()
    filter_shows = ShowFilter.objects.all()

    cat_data =[]
    for cat_three in categorys:
        dic= {
            "title":cat_three.title,
            "id":cat_three.id,
            
        }
        cat_two_list=[]
        for cat_two in cat_three.cat_2.all():
            dic_cat_two={
                "id":cat_two.id,
                "title":cat_two.title,
               
            }

            cat_one_list=[]
            for cat_one in cat_two.cat_1.all():
                dic_cat_one={
                    "id":cat_one.id,
                    "title":cat_one.title,
                    
                }
                cat_one_list.append(dic_cat_one)
            dic_cat_two['cat_ones']=cat_one_list
            cat_two_list.append(dic_cat_two)

        dic["cat_twos"]=cat_two_list
        cat_data.append(dic)
 
    return render(request,"Shop/HomePage.html",{"filter_shows":filter_shows,"categorys":categorys,"categorysss":cat_data})
def profile_page(request):
    return render(request,"Shop/Profile.html")



def login_or_register(request):
    return render(request,"Shop/AuthUserManager/LoginOrRegister.html")

def phone_verification_page(request):
    token = request.GET.get("token")
   
    return render(request,"Shop/AuthUserManager/PhoneVerify.html",{"token":token})


def change_or_create_pass(request):
    token = request.GET.get("token")
    return render(request,"Shop/AuthUserManager/CreateOrChangePass.html",{"token":token})


def login_by_pass(request):
    token = request.GET.get("token")
    return render(request,"Shop/AuthUserManager/LoginByPass.html",{"token":token})

def forget_password(request):
    token = request.GET.get("token")
    net_worker_user = Token.objects.get(key=token)

    random_number = random.randint(1000, 9999)
  
    net_worker_user.user.user_networker.phone_vrify_code = random_number
    net_worker_user.user.user_networker.save()

    send_sms(f"{net_worker_user.user.user_networker.phone_vrify_code}",net_worker_user.user.username)
    redirect_url = f"/Market/PhoneVerification?token={token}"
    return redirect(redirect_url)


@api_view(['POST'])
def login_user_bypass (request):
    data= request.data
    print(data)
    token = request.GET.get("token")
    password = data['password']
    net_worker_user = Token.objects.get(key=token)
    auth_user =authenticate(username=net_worker_user.user.username,password=password)
    if auth_user:
        login(request,auth_user)
        return Response(status=status.HTTP_200_OK,data={"message":"با موفقیت وارد شدید","redirect_url":"/Market/Home"})
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"رمز عبور وارد شده اشتباه میباشد"})
class LoginOrRegisterManager(APIView):
    def get(self,request):
        token = request.GET.get("token")
        code= request.GET.get("code")
        token_obj = Token.objects.get(key=token)
     
        if int(token_obj.user.user_networker.phone_vrify_code) == int(code):
            redirect_url =f"/Market/CreateOrChangePass?token={token}"
            
            return Response(status=status.HTTP_200_OK,data={"message":"با موفقیت انجام شد" ,"redirect_url":redirect_url})
        return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"کد وارد شده صحیح نمیباشد"})
        
    def post(self,request):
        data= request.data
        phone=  data['phone']
        if UserAccount.objects.filter(username=phone).exists():
            
            user_obj = UserAccount.objects.get(username=phone)
            token = Token.objects.get_or_create(user=user_obj)
            redirect_url = f"/Market/LoginByPass?token={token[0]}"
            return Response(status=status.HTTP_200_OK,data={"redirect_url":redirect_url,"message":"با موفقیت انجام شد"})
        else:
           
            new_user= UserAccount(
                username=phone,
                phone=phone,
            )
            new_user.save()
            new_networker = Networker(user=new_user)
            random_number = random.randint(1000, 9999)
            new_networker.phone_vrify_code = random_number

            new_networker.save()
            token = Token.objects.get_or_create(user=new_user)
            send_sms(f"{random_number}",phone)
            redirect_url = f"/Market/PhoneVerification?token={token[0]}"

            return Response(status=status.HTTP_200_OK,data={"redirect_url":redirect_url,"message":"ما پیامکی حاوی کد فعالسازی برای شما ارسال کردیم"})
    


    def put(self,request):
        data=request.data
        token = data['token']
        password = data['password']
        confirmpassword=data['confirmpassword']
        token_obj = Token.objects.get(key=token)
        if confirmpassword == password :
            if len(password) < 8 :
                return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"رمز عبور باید بیشتر از 8 رقم باشد"})
            else:
                token_obj.user.set_password(password)

                token_obj.user.save()
                login(request, token_obj.user)
                return Response(status=status.HTTP_202_ACCEPTED,data={"message":"رمز عبور با موفقیت ثیت شد","redirect_url":"/Market/Home"})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"رمز عبور های وارد شده شباهت ندارند"})

class AddToCard(APIView):
    def post(self,request,product_code):
        data= request.data
     
        inventorys=data['inventorys']
        

        if request.session.get('card_list'):
            card_list = request.session.get('card_list')
            product_status=True
            for item in card_list:
                if item['product_code'] == product_code:
                    product_status=False
                    for new_inventory in inventorys:
                        inv_status=True
                        for inventory in item['inventorys']:
                            if int(inventory['inv_id']) == int(new_inventory):
                                inv_status=False
                                print(inventory['quantity'],"!!!")
                                print(data['quantity'],"!!!22")
                                inventory['quantity'] =  int(inventory['quantity']) + int(data['quantity'])
                        if inv_status:
                            item['inventorys'].append(
                                {
                                    "inv_id":new_inventory,
                                    "quantity": int(data['quantity'])
                                }
                            )
                      
            if product_status:
                dic ={
                "product_code":product_code,
                "inventorys":[]
                }
                for new_inventory in inventorys:
                    dic["inventorys"].append(
                            {
                                "inv_id":new_inventory,
                                "quantity": int(data['quantity'])
                            }
                        )
            request.session['card_list'] = card_list



        else:

            card = []
            dic ={
                "product_code":product_code,
                "inventorys":[]
            }
            for inventory in inventorys:
                dic["inventorys"].append(
                    {
                        "inv_id":inventory,
                        "quantity": int(data['quantity'])
                    }
                )
            card.append(dic)

            expiry_time = timedelta(hours=1)
            request.session.set_expiry(expiry_time.total_seconds())




            request.session['card_list'] = card
          
        return Response(status=status.HTTP_201_CREATED)
    
    def put (self,request,product_code,inventory_id):
        card_list =request.session.get("card_list")
        quantity = request.GET.get("quantity")
        price_of_card = 0
        for card in card_list:
            if int(card['product_code']) == int(product_code):
                product_object = Product.objects.get(product_code =card['product_code'])
                for inv in card['inventorys']:
                    if int(inv['inv_id']) == int(inventory_id):
                        pack_size_num =0
                        inventory_object = Inventory.objects.get(id=inv['inv_id'])
                        for size in inventory_object.count_inventory.all():
                            pack_size_num+=1
                        price_of_card+=int(product_object.price) * (int(quantity) * int(pack_size_num) )
                        inv['quantity'] = quantity
        total_card_price = 0
        print(card_list)
        for card in card_list :
                product_object = Product.objects.get(product_code =card['product_code'])
                for inventory in card['inventorys']:
               
                    inventory_object = Inventory.objects.get(id=inventory['inv_id'])
                    pack_size_num =0
                    for size in inventory_object.count_inventory.all():
                        pack_size_num+=1

                    
                        
                    total_card_price += int(product_object.price) * (int(inventory['quantity']) * int(pack_size_num) )
        request.session['card_list'] = card_list
        return Response(status=status.HTTP_202_ACCEPTED,data={"prie_of_card":price_of_card,"total_card_price":total_card_price})




    def delete (self,request,product_code,inventory_id):
        card_list =request.session.get('card_list')
        
        new_card_list = []
        for item in card_list:
            if int(item ['product_code']) == int(product_code):
                dic={
                    "product_code": product_code,
                    "inventorys":[]
                }
                for inv in item['inventorys']:
                    if int (inv['inv_id']) == int(inventory_id):
                        pass
                    else:
                        dic['inventorys'].append(inv)
                new_card_list.append(dic)
            else:
                new_card_list.append(item)
        request.session['card_list'] =new_card_list
        count_card = 0
        total_card_price = 0
        
        for card in new_card_list :
                product_object = Product.objects.get(product_code =card['product_code'])
                for inventory in card['inventorys']:
                    count_card += 1
                    inventory_object = Inventory.objects.get(id=inventory['inv_id'])
                    pack_size_num =0
                    for size in inventory_object.count_inventory.all():
                        pack_size_num+=1

                    
                        
                    total_card_price += int(product_object.price) * (int(inventory['quantity']) * int(pack_size_num) )
      
      

        return Response(status=status.HTTP_200_OK,data={"count_card":count_card,"total_card_price":total_card_price})
    



def cart_list_page(request):
    card_list= request.session.get("card_list")
    card_objects = []
    total_card_price = 0
    count_card= 0
    try:
        for card in card_list :
            product_object = Product.objects.get(product_code =card['product_code'])
            for inventory in card['inventorys']:
                count_card += 1
                inventory_object = Inventory.objects.get(id=inventory['inv_id'])
                pack_size_num =0
                size_list = []
                for size in inventory_object.count_inventory.all():
                    dic={
                        "size_name":size.size.name,
                        "size_id":size.size.id,
                    }
                    size_list.append(dic)
                    pack_size_num+=1
                print(size_list)

                dic ={
                    "size_list":size_list,
                    "product_code":product_object.product_code,
                    "product_title":product_object.title,
                    "price":product_object.price,
                    "quantity":inventory['quantity'],
                    "inventory_id" :inventory_object.id,
                    "color_code":inventory_object.color.color_code,
                    "color_name":inventory_object.color.name,
                    "price_per_card":int(product_object.price) * (int(inventory['quantity']) * int(pack_size_num) )


                }
                if product_object.main_image:
                    dic['product_image'] = product_object.main_image.url
                else:
                    dic['product_image'] = "#"
                card_objects.append(dic)
                total_card_price += int(product_object.price) * (int(inventory['quantity']) * int(pack_size_num) )
    except:
        pass

    return render(request, "Shop/CardList.html",{
        "card_objects":card_objects,
        "total_card_price":total_card_price,
        "count_card":count_card,
    })
@login_required(login_url="ShopUrl:LoginOrRegister")
def peyment_method_page(request):
    
    networker  = request.user.user_networker
    states = State.objects.all()
    return render(request,"Shop/PeymentMethod.html",{"networker":networker,"states":states,"networker_id":networker.id})


class NetWorkerAddresManager(APIView):
    def post(self,request):
        data= request.data
        networker  = Networker.objects.get(id=request.GET.get("networker_id"))
        first_name = data['first_name']
        last_name = data['last_name']
        state_code = data['state_code']
        city_code = data['city_code']
        postal_code = data['postal_code']
        phone_number = data['phone_number']
        meli_code = data['meli_code']
        house_number = data['house_number']
        main_addres = data['main_addres']

        city = City.objects.get(code=city_code)
        state=State.objects.get(code=state_code)
        new_addres= Addres(
            first_name= first_name,
            last_name= last_name,
            state= state,
            city= city,
            postal_code= postal_code,
            phone_number= phone_number,
            meli_code= meli_code,
            house_number= house_number,
            main_addres= main_addres,
        )
        new_addres.save()
        networker.addres.add(new_addres)
        
        return Response(status=status.HTTP_200_OK)
    def put(self,request,addres_id):
        data= request.data
        addres_obj= Addres.objects.get(id=addres_id)
        networker  = Networker.objects.get(id=request.GET.get("networker_id"))
        first_name = data['first_name']
        last_name = data['last_name']
        state_code = data['state_code']
        city_code = data['city_code']
        postal_code = data['postal_code']
        phone_number = data['phone_number']
        meli_code = data['meli_code']
        house_number = data['house_number']
        main_addres = data['main_addres']
        city = City.objects.get(code=city_code)
        state=State.objects.get(code=state_code)
        addres_obj.first_name = first_name
        addres_obj.last_name = last_name
        addres_obj.postal_code = postal_code
        addres_obj.phone_number = phone_number
        addres_obj.meli_code = meli_code
        addres_obj.house_number = house_number
        addres_obj.main_addres = main_addres
        addres_obj.city = city
        addres_obj.state = state
        addres_obj.save()
        return Response(status=status.HTTP_200_OK)
    def delete (self,request,addres_id):
        addres_obj = Addres.objects.get(id=addres_id)
        addres_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def about_us_page(request):
    context = {"title":"درباره ib7.ir"}
    try:
        text = AbutUs.objects.last().text
        context['text'] = text
    except:
        pass
    return render(request,"Shop/ShopPageSection.html",context)
    


def why_us_page(request):
    context = {"title":"چرا ib7.ir"}
    try:
        text = WhyUs.objects.last().text
        context['text'] = text
    except:
        pass
    return render(request,"Shop/ShopPageSection.html",context)
def terms_and_c_page(request):
    context = {"title":"قوانین و مقررارت  ib7.ir"}
    try:
        text = TermsAndConditions.objects.last().text
        context['text'] = text
    except:
        pass
    return render(request,"Shop/ShopPageSection.html",context)
def how_to_buy_page(request):
    context = {"title":"راهنمای خرید در   ib7.ir"}
    try:
        text = HowToBuy.objects.last().text
        context['text'] = text
    except:
        pass
    return render(request,"Shop/ShopPageSection.html",context)
def return_terms_page(request):
    context = {"title":"قوانین مرجوعی کالا در  ib7.ir"}
    try:
        text = ReturnTerms.objects.last().text
        context['text'] = text
    except:
        pass
    return render(request,"Shop/ShopPageSection.html",context)
def many_question_page(request):
    title_question_objs= TitleQuestion.objects.all()

    return render(request,"Shop/ManyQuestion.html",{"title_question_objs":title_question_objs})
    

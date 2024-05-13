from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *
import json
from django.core.files.storage import FileSystemStorage
from pathlib import Path
import os
from .serializers import ProductSerializer
from .forms import *
from django.http import JsonResponse
# Create your views here.
def product_list_page(request):
    return render(request, 'ShopManageMent/ProductManageMent/ProductList.html', )

def create_product_page(request):
    categorys =CategoryOne.objects.all()
    showfilters =ShowFilter.objects.all()
    return render(request, 'ShopManageMent/ProductManageMent/CreateProduct.html',{"categorys":categorys,"showfilters":showfilters})

class ProductManageMent(APIView):
    def get(self,request):
        product = Product.objects.all()

        json_data = ProductSerializer(product,many=True).data
        return Response(status=status.HTTP_200_OK,data={"data":json_data})
    def post(self,request):
        
        data= request.data
   
        category= data.getlist('category')
        show_filters= data.getlist('show_filters')
        title= data['title']
        price= data['price']
        discription= data['discription']
        pr_list =data.getlist('pr_list')
        sp_list = data.getlist('sp_list')

        new_product=Product(
            title=title,
            price=price,
            discription=discription
        )
        
        try:
            image_path=request.session['image_path']
            file_name = os.path.basename(image_path)
          

            new_product.main_image.save(file_name,open(image_path,'rb'))
            path = Path(image_path)
            if path.exists():
                    path.unlink()
            request.session['image_path']=None
            
        except:
            pass
        new_product.save()
        try:
        
            image_paths=request.session.get('galery_image_product_ses')
            image_objs=[]
            for item in image_paths:
                image_model =Image()
                image_model.image_file.save(item['filename'],open(item['path'],'rb'))
                image_model.save()
                new_product.image.add(image_model)
                image_objs.append(image_model)

                path = Path(item['path'])
                if path.exists():
                    path.unlink()
            request.session['galery_image_product_ses']=[]
        except:
            pass
          

            
        
        code= new_product.id + 1000
        new_product.product_code=code
        new_product.save()
        for sp in sp_list:
            for item in json.loads(sp):
              
                new_specification =SpeciFication(
                    title=item['title'],
                    dis=item['dis']
                )
                new_specification.save()
                new_product.specification.add(new_specification)
        for pr in pr_list:
            for item in json.loads(pr):
                new_property = Propery(
                    title=item['title'],
                    dis=item['dis']
                )
                new_property.save()
                new_product.property.add(new_property)
        for cat in category:
            category_obj = CategoryOne.objects.get(id=cat)
            new_product.category.add(category_obj)
        for show in show_filters:
            showfilter = ShowFilter.objects.get(id=show)
            new_product.show_filters.add(showfilter)
        return Response(status=status.HTTP_200_OK)
    
    def put(self,request,product_id):
        product_obj=Product.objects.get(id=product_id)
        data= request.data
     
        pr_list =data.getlist('pr_list')
        sp_list = data.getlist('sp_list')
        for sp in sp_list:
            for item in json.loads(sp):
              
                new_specification =SpeciFication(
                    title=item['title'],
                    dis=item['dis']
                )
                new_specification.save()
                product_obj.specification.add(new_specification)
        for pr in pr_list:
            for item in json.loads(pr):
                new_property = Propery(
                    title=item['title'],
                    dis=item['dis']
                )
                new_property.save()
                product_obj.property.add(new_property)
        categorys = data.getlist("category")
        show_filters = data.getlist("show_filters")
        title= data['title']
        price= data['price']
        discription= data['discription']
        product_obj.title=title
        product_obj.price=price
        product_obj.discription=discription
        product_obj.save()    
        for category in categorys:
            cat_obj = CategoryOne.objects.get(id=category)
            
            product_obj.category.add(cat_obj)
        for show_filter in show_filters:
            show_filter_obj = ShowFilter.objects.get(id=show_filter)
            
            product_obj.show_filters.add(show_filter_obj)
        return Response(status=status.HTTP_200_OK)

    def delete(self,request,product_id):
        product_obj = Product.objects.get(id=product_id)
        product_obj.delete()
        return Response(status=status.HTTP_200_OK)
def handle_uploaded_file(file):
    with open('session_images/main_images/' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
@api_view(["POST"])
def add_main_file_product (request):
    # request.session['image_path']=None
    image_file=handle_uploaded_file(request.FILES.get("file"))
    print(image_file)
  
    # request.session['main_image_product']=image_file
    request.session['image_path'] = 'session_images/main_images/' + request.FILES['file'].name
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def delete_main_image_product(request):
    image_path=request.session['image_path']

    path = Path(image_path)
    if path.exists():
        path.unlink()

        


    return Response(status=status.HTTP_200_OK)
def handle_uploaded_file_galery_image(file):
    with open('session_images/galery_images/' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
class GaleryImageProduct(APIView):
    def post(self,request):
        
            image_file = handle_uploaded_file_galery_image(request.FILES.get("file"))
            # request.session['galery_image_product_ses'] =None
            try:
                
                ses=request.session.get('galery_image_product_ses')
                main_list=[]
                for item in ses:
                    main_list.append(item)
                main_list.append({'filename':request.FILES.get("file").name,"path":'session_images/galery_images/' + request.FILES.get("file").name})
                request.session['galery_image_product_ses']=main_list
                # ses.append({'filename':request.FILES.get("file").name,"path":'session_images/galery_images/' + request.FILES.get("file").name})
            except:

                
                request.session['galery_image_product_ses']=[{'filename':request.FILES.get("file").name,"path":'session_images/galery_images/' + request.FILES.get("file").name}]

            
            return Response(status=status.HTTP_200_OK)
    def get(self,request):
       
        file_name = request.GET.get("filename")
        main_list=[]
        
        for item in request.session['galery_image_product_ses']:
            
            if item['filename'] == file_name:
               
                path = Path(item['path'])
                if path.exists():
                    path.unlink()
            else:
                main_list.append(item)
        
        request.session['galery_image_product_ses']=main_list
        
        return Response(status=status.HTTP_200_OK)
    



def edit_product_page(request,product_id):
    product_obj = Product.objects.get(id=product_id)
    categorys = CategoryOne.objects.all()
    showfilters = ShowFilter.objects.all()
    category_list = [
    {
        "id": category.id,
        "title": category.title,
        "check": any(cat_pro.id == category.id for cat_pro in product_obj.category.all())
    }
    for category in categorys
    ]

    show_filter_list = [
        {
            "id": showfilter.id,
            "title": showfilter.title,
            "check": any(show_filter.id == showfilter.id for show_filter in product_obj.show_filters.all())
        }
        for showfilter in showfilters
    ]

            
    return render(request,'ShopManageMent/ProductManageMent/EditProduct.html',{'product_obj':product_obj,"categorys":category_list,"show_filter_list":show_filter_list})

@api_view(['POST'])
def chagne_main_image_product(request,product_id):
    file = request.FILES.get("file")
    product_obj =Product.objects.get(id=product_id)
    product_obj.main_image=file
    product_obj.save()    
    return Response(status=status.HTTP_200_OK,data={"url":product_obj.main_image.url})


@api_view(['GET'])
def delete_main_image_pro(request,product_id):
   
    product_obj =Product.objects.get(id=product_id)
    product_obj.main_image.delete()
    product_obj.save()    
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def add_galery_image_topro(request, product_id):
    image = request.FILES.get("file")

    product_obj = Product.objects.get(id=product_id)
    new_image = Image(image_file=image)
    new_image.save()
    product_obj.image.add(new_image)
    try:
                
        ses=request.session.get('galery_image_edit_product_ses')
        main_list=[]
        for item in ses:
            main_list.append(item)
        main_list.append({'filename':request.FILES.get("file").name,"id":new_image.id})
        request.session['galery_image_edit_product_ses']=main_list
        
    except:

                
        request.session['galery_image_edit_product_ses']=[{'filename':request.FILES.get("file").name,"id":new_image.id}]
    return Response(status=status.HTTP_200_OK,data={"url":new_image.image_file.url,"id":new_image.id})
@api_view(['GET'])
def delete_galery_image(request):
    file_name = request.GET.get("filename")
    main_list=[]
    id_im= 0
    for item in request.session['galery_image_edit_product_ses']:
        if item['filename']==file_name:
           Image.objects.get(id=item['id']).delete()
           id_im=item['id']
        else:
            main_list.append(item)
    request.session['galery_image_edit_product_ses']=main_list
    return Response(status=status.HTTP_200_OK,data={"id":id_im})



@api_view(['GET'])
def delete_main_image(request,product_id):
    product_obj=Product.objects.get(id=product_id)
    product_obj.main_image.delete()
    product_obj.save()
    return Response(status=status.HTTP_200_OK)
@api_view(['GET'])
def delete_g_image(request,g_id):
    product_obj=Image.objects.get(id=g_id)
    product_obj.delete()

    return Response(status=status.HTTP_200_OK)



#CateGoryThree Begin 

def category_three_page(request):
    category_three_objs= CategoryThree.objects.all()
    return render(request,"ShopManageMent/Categorys/CategoryThreeList.html",{'categorys':category_three_objs})



class CategoryThreeManager(APIView):
    def get(self,request):
        categorys = CategoryThree.objects.all()
        list_categorys = []
        for category in categorys:
            dic={
                "id": category.id,
                "title": category.title,

            }
            list_categorys.append(dic)
        return Response(status=status.HTTP_200_OK,data={"data": list_categorys})
    def post(self,request):
        data= request.data
        title= data['title']
        CategoryThree(title=title).save()
        return Response(status=status.HTTP_201_CREATED)
    
    def put(self,request,cat_id):
        data= request.data
        title= data['title']
        category_three_obj = CategoryThree.objects.get(id=cat_id)
        category_three_obj.title=title
        category_three_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    

    def delete(self,request,cat_id):
        category_three_obj = CategoryThree.objects.get(id=cat_id)
        category_three_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

#CateGory Three End




#CateGory two Begin 

def category_two_page(request):
    category_two_objs= CategoryTwo.objects.all()
    category_three =CategoryThree.objects.all()
    main_data =[]
    for cat_two in category_two_objs:
        main_dic ={
            "id":cat_two.id,
            "title":cat_two.title,
            "cat_three_ids":[]
        }
        for cat_three in category_three:
            main_dic['cat_three_ids'].append({"id":cat_three.id,"title":cat_three.title,"selected":False})
        
        for cat_three_in_two in cat_two.category_three.all():
            for item in main_dic['cat_three_ids']:
                if item['id'] == cat_three_in_two.id :
                    item['selected'] = True
        main_data.append(main_dic)
    
    return render(request,"ShopManageMent/Categorys/CategoryTwoList.html",{'categorys':main_data,"category_three_objs":category_three})



class CategoryTwoManager(APIView):
    def get(self,request):
        categorys = CategoryTwo.objects.all()
        list_categorys = []
        for category in categorys:
            dic={
                "id": category.id,
                "title": category.title,

            }
            list_categorys.append(dic)
        return Response(status=status.HTTP_200_OK,data={"data": list_categorys})
    def post(self,request):
        
        data= request.data
        category_three =data.getlist("category_three")
       
        title= data['title']
        category_two_new = CategoryTwo(title=title)
        category_two_new.save()
        for item in category_three:
            category_three_obj = CategoryThree.objects.get(id=item)
            category_two_new.category_three.add(category_three_obj)
        category_two_new.save()
        
        
        return Response(status=status.HTTP_201_CREATED)
    
    def put(self,request,cat_id):
        data= request.data
        title= data['title']
        category_three =data.getlist("category_three")
        print(category_three)
        category_two_obj = CategoryTwo.objects.get(id=cat_id)
        category_two_obj.title=title
        for item in category_three:
            cat_three_obj = CategoryThree.objects.get(id=item)
            category_two_obj.category_three.add(cat_three_obj)

        category_two_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    

    def delete(self,request,cat_id):
        category_two_obj = CategoryTwo.objects.get(id=cat_id)
        category_two_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

#CateGory Two End
#CateGory two Begin 

def category_one_page(request):
    category_one_objs= CategoryOne.objects.all()
    category_two =CategoryTwo.objects.all()
    main_data =[]
    for cat_one in category_one_objs:
        main_dic ={
            "id":cat_one.id,
            "title":cat_one.title,
            "cat_three_ids":[]
        }
        for cat_two in category_two:
            main_dic['cat_three_ids'].append({"id":cat_two.id,"title":cat_two.title,"selected":False})
        
        for cat_two_in_one in cat_one.category_two.all():
            for item in main_dic['cat_three_ids']:
                if item['id'] == cat_two_in_one.id :
                    item['selected'] = True
        main_data.append(main_dic)
    
    
    return render(request , "ShopManageMent/Categorys/CategoryOneList.html",{'categorys':main_data,"category_two_objs":category_two})



class CategoryOneManager(APIView):
    def get(self,request):
        categorys = CategoryOne.objects.all()
        list_categorys = []
        for category in categorys:
            dic={
                "id": category.id,
                "title": category.title,

            }
            list_categorys.append(dic)
        return Response(status=status.HTTP_200_OK,data={"data": list_categorys})
    def post(self,request):
        
        data= request.data
        category_three =data.getlist("category_three")
       
        title= data['title']
        category_one_new = CategoryOne(title=title)
        category_one_new.save()
        for item in category_three:
            category_two_obj = CategoryTwo.objects.get(id=item)
            category_one_new.category_two.add(category_two_obj)
        category_one_new.save()
        
        
        return Response(status=status.HTTP_201_CREATED)
    
    def put(self,request,cat_id):
        data= request.data
        title= data['title']
        category_three =data.getlist("category_three")
        
        category_one_obj = CategoryOne.objects.get(id=cat_id)
        category_one_obj.title=title
        for item in category_three:
            cat_two_obj = CategoryTwo.objects.get(id=item)
            category_one_obj.category_two.add(cat_two_obj)

        category_one_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    

    def delete(self,request,cat_id):
        category_one_obj = CategoryOne.objects.get(id=cat_id)
        category_one_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

#CateGory Two End


#ColorManager begin
    
def color_list_page(request):
    color_objs = Color.objects.all()
    return render(request,"ShopManageMent/InventoryManager/ColorList.html",{"colors":color_objs})

class ColorManager(APIView):
    def get (self,request):
        color_objs = Color.objects.all()
        data =[]
        for color_obj in color_objs:
            data.append({
                "id":color_obj.id,
                "color_code":color_obj.color_code,
                "color_name":color_obj.name,

            })
        return Response(status=status.HTTP_200_OK,data={"data":data})
    def post (self,request):
        data=request.data
        color_name= data['color_name']
        color_code = data['color_code']
        new_color_obj=Color(
            name=color_name,
            color_code=color_code,
        )
        new_color_obj.save()
        return Response(status=status.HTTP_201_CREATED)
    def put(self,request,color_id):
        data=request.data
        color_obj = Color.objects.get(id=color_id)
        color_obj.color_code= data['color_code']
        color_obj.name=data['color_name']
        color_obj.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def delete(self,request,color_id):
        Color.objects.get(id=color_id).delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    

#ColorManager End
    
#SizeManager Begin
def size_list_page(request):
    size_objs = Size.objects.all()
    return render(request,"ShopManageMent/InventoryManager/SizeLIst.html",{"sizes":size_objs})

class SizeManager(APIView):
    def get (self,request):
        size_objs = Size.objects.all()
        data =[]
        for size_obj in size_objs:
            data.append({
                "id":size_obj.id,
       
                "size_name":size_obj.name,

            })
        return Response(status=status.HTTP_200_OK,data={"data":data})
    def post (self,request):
        data=request.data
        size_name= data['size_name']
      
        new_size_obj=Size(
            name=size_name,
            
        )
        new_size_obj.save()
        return Response(status=status.HTTP_201_CREATED)
    def put(self,request,size_id):
        data=request.data
        size_obj = Size.objects.get(id=size_id)
   
        size_obj.name=data['size_name']
        size_obj.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def delete(self,request,size_id):
        Size.objects.get(id=size_id).delete()
        return Response(status=status.HTTP_202_ACCEPTED)
#Size Manager End
    

def inventorylist(request):
    return render(request,"ShopManageMent/InventoryManager/InventoryList.html")

def create_or_edit_inv_page(request,product_id):
    product_obj = Product.objects.get(id=product_id)
    data= []
    colors = Color.objects.all()
    sizes = Size.objects.all()
    for color in colors:
        dic = {
            "id":color.id,
            "check":False,
            "color_name":color.name,
            "color_code":color.color_code,
            "sizes":[]
        }
        for size in sizes:
            dic['sizes'].append(
                {
                    "id":size.id,
                    "name":size.name,
                    "check":False,
                    "count":0
                }
            )
        for inv in product_obj.inventory.all():
            
            if inv.color.id == color.id:
                dic['check'] = True
                for inv_count in inv.count_inventory.all():
                    for size_in_dic in dic['sizes']:
                        if size_in_dic['id'] == inv_count.size.id:
                            size_in_dic['check'] = True
                            size_in_dic['count']= inv_count.count
        data.append(dic)
 
        
    print(data)      
            
            
            
    return render(request,"ShopManageMent/InventoryManager/CreateOrEditInv.html",{"data":data,"sizes":sizes,"product":product_obj})

class InventoryManager(APIView):
    def get (self,request):
        products= Product.objects.all()
        data= []
        for product in products:
            dic ={
                "id":product.id,
                "code":product.product_code,
                "inventory_count":product.total_invenory(),
                "title":product.title,
                
            }
            data.append(dic)
        return Response(status=status.HTTP_200_OK,data={"data":data})
    def post (self,request,product_id):
        main_data=request.data
        product_obj= Product.objects.get(id=product_id)
        
    
            
       
        colors = main_data['colors']
        for color in colors:
                size_list = main_data[f"size_l_{color}"]
                status_color= True
                for inv_product in product_obj.inventory.all():
                    if inv_product.color.id == int(color):
                        status_color=False
                        for size in size_list:
                            status_size = True
                            for size_inv in inv_product.count_inventory.all():
                                if size_inv.size.id == int(size):
                                    status_size=False
                                    count = main_data[f"count_{color}_{size}"]
                                    size_inv.count =count
                                    size_inv.save()
                            if status_size:
                                count = main_data[f"count_{color}_{size}"]
                                size_obj = Size.objects.get(id=size)
                                new_count_inv = CountInventory(
                                    size=size_obj,
                                    count=count
                                )
                                new_count_inv.save()
                                inv_product.count_inventory.add(new_count_inv)
                if status_color:
                    color_obj = Color.objects.get(id=color)
                    new_inventory= Inventory(
                        color=color_obj
                        
                    )
                    new_inventory.save()
                    for size in size_list:
                        count = main_data[f"count_{color}_{size}"]
                        size_obj = Size.objects.get(id=size)
                        new_count_invvv= CountInventory(
                            size=size_obj,   
                            count=count,
                        )
                        new_count_invvv.save()
                        new_inventory.count_inventory.add(new_count_invvv)
                    product_obj.inventory.add(new_inventory)
                        
                
                        
                                
                        
                        
               
                # for size in size_list:
                #     count = main_data[f"count_{color}_{size}"]
                    
        
        return Response(status=status.HTTP_201_CREATED)
    
    

@api_view(['GET'])
def error_text(request):
    data =request.data
    color_obj= Color.objects.get(id=request.GET.get("color_id"))
    return Response(status=status.HTTP_200_OK,data={"message":f"انتخاب حداقل یک سایز برای رنگ {color_obj.name} الزامی میباشد"})



class PropertyManager(APIView):
    def put(self,request,property_id):
        data=request.data
        property_obj=Propery.objects.get(id=property_id)
        property_obj.title= data['title']
        
        property_obj.dis= data['dis']
        property_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    def delete (self,request,property_id):
        property_obj=Propery.objects.get(id=property_id)
        property_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class SpeciFicationManager(APIView):
    def put(self,request,sep_id):
        data=request.data
        property_obj=SpeciFication.objects.get(id=sep_id)
        property_obj.title= data['title']
        
        property_obj.dis= data['dis']
        property_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    def delete (self,request,sep_id):
        property_obj=SpeciFication.objects.get(id=sep_id)
        property_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

def show_filter_page(request):
    show_filters = ShowFilter.objects.all()
    return render(request, 'ShopManageMent/ShowFilterList.html',{"show_filters":show_filters})

class ShowFilterManager(APIView):
    def get(self,request):
        show_filters = ShowFilter.objects.all()
        list_show = []
        for category in show_filters:
            dic={
                "id": category.id,
                "title": category.title,

            }
            list_show.append(dic)
        return Response(status=status.HTTP_200_OK,data={"data": list_show})
    def post(self,request):
        data= request.data
        title= data['title']
        ShowFilter(title=title).save()
        return Response(status=status.HTTP_201_CREATED)
    
    def put(self,request,show_id):
        data= request.data
        title= data['title']
        show_filter = ShowFilter.objects.get(id=show_id)
        show_filter.title=title
        show_filter.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    

    def delete(self,request,show_id):
        show_filter = ShowFilter.objects.get(id=show_id)
        show_filter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    



def slider_image_page(request):
    return render(request,"ShopManageMent/ShopSection/SliderImage.html")


class AddSliderImageSession(APIView):
    def post(self,request):
        
        myfile = request.FILES['file']
       
        if request.session.get("ImageSliders") is not None:
            print("sd")
            session = request.session.get("ImageSliders")

            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
  
            uploaded_file_url = fs.url(filename)
            session.append({"file_url":uploaded_file_url,"file_name":filename})
            request.session['ImageSliders']=session
            
        else:
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            uploaded_file_url = fs.url(filename)

           
            # Now `uploaded_file_url` contains the URL where the file is temporarily stored
            # You can store this URL in the session
            request.session['ImageSliders'] = [{"file_url":uploaded_file_url,"file_name":filename}]
            print(request.session['ImageSliders'] )
      
        return Response(status=status.HTTP_200_OK)
    def get (self,request):
        
        filename=request.GET.get("filename")
        main_data= []
        for item in request.session['ImageSliders']:
            if item['file_name'] == filename:
                main_file_name = item['file_name']
                path = Path(f'media/{main_file_name}')
                if path.exists():
                    path.unlink()
            else:
                main_data.append(item)
        request.session['ImageSliders']=main_data
        return Response(status= status.HTTP_200_OK)

class SliderImageManager(APIView):
    def get(self, request):
        data= []
        try:
            slider_image_obj = SliderImage.objects.last()
            for image in slider_image_obj.image.all():
                dic = {
                    "id":image.id,
                    "image_url":image.image_url
                }
                data.append(dic)
            print(data)
            return Response(status=status.HTTP_200_OK,data={"data":data})
        
        except:
            return Response(status=status.HTTP_200_OK,data={"data":data})
    def post(self,request):
        if request.session['ImageSliders'] is not None:
            try:
                slider_image_obj = SliderImage.objects.last()

                session = request.session.get("ImageSliders")

                for image in session:
                    new_image_obj = Image(image_url=image['file_url'])
                    new_image_obj.save()
                    slider_image_obj.image.add(new_image_obj)
            except:
                slider_image_obj = SliderImage().save()

                session = request.session.get("ImageSliders")

                for image in session:
                    new_image_obj = Image(image_url=image['file_url'])
                    new_image_obj.save()
                    slider_image_obj.image.add(new_image_obj)
        return Response(status=status.HTTP_201_CREATED)

    
            
    def delete (slef,request,image_id):
        image_obj = Image.objects.get(id=image_id)
        file_url = image_obj.image_url
        if file_url.startswith("/"):
            file_url = file_url[1:]
        path = Path(image_obj.image_url)
        
        if path.exists():
            path.unlink()
        image_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def return_terms_page(request):
    if request.method == 'POST':
        if ReturnTerms.objects.last() is not None:
            instance = ReturnTerms.objects.last()
            form = ReturnTermsForm(request.POST, instance=instance)
            if form.is_valid():
                form.save()
                return redirect("/ShopManageMent/HowToBuy?status=true")
        else:
            form =ReturnTermsForm(request.POST)
            if form.is_valid():
                form.save()
                return redirect("/ShopManageMent/HowToBuy?status=true")
        
    else:
        if ReturnTerms.objects.last() is not None:
            instance = ReturnTerms.objects.last()

            form = ReturnTermsForm(instance=instance)
        else:
            form = ReturnTermsForm()
        return render(request,"ShopManageMent/ShopSection/ShopSecText.html",{"form":form,"page_name":"شرایط مرجوعی"})

def how_to_buy_page(request):
    if request.method == 'POST':
        if HowToBuy.objects.last() is not None:
            instance = HowToBuy.objects.last()
            form = HowToBuyForm(request.POST, instance=instance)
           
            if form.is_valid():
                form.save()
                return redirect("/ShopManageMent/HowToBuy?status=true")
        else:
            form =HowToBuyForm(request.POST)
        
            if form.is_valid():
                print("fuck ye")
                form.save()
                return redirect("/ShopManageMent/HowToBuy?status=true")
            else:
                
                return redirect("/ShopManageMent/HowToBuy?status=true")
        
    else: 
        if HowToBuy.objects.last() is not None:
            instance = HowToBuy.objects.last()

            form = HowToBuyForm(instance=instance)
        else:
            form = HowToBuyForm()
        return render(request,"ShopManageMent/ShopSection/ShopSecText.html",{"form":form,"page_name":"شرایط مرجوعی"})
    
def terms_and_c_page(request):
    if request.method == 'POST':
        if TermsAndConditions.objects.last() is not None:
            instance = TermsAndConditions.objects.last()
            form = TermsAndConditionsForm(request.POST, instance=instance)
           
            if form.is_valid():
                form.save()
                return redirect("/ShopManageMent/TermsAndConditions?status=true")
        else:
            form =TermsAndConditionsForm(request.POST)
        
            if form.is_valid():
                print("fuck ye")
                form.save()
                return redirect("/ShopManageMent/TermsAndConditions?status=true")
            else:
                
                return redirect("/ShopManageMent/TermsAndConditions?status=true")
        
    else: 
        if TermsAndConditions.objects.last() is not None:
            instance = TermsAndConditions.objects.last()

            form = TermsAndConditionsForm(instance=instance)
        else:
            form = TermsAndConditionsForm()

        return render(request,"ShopManageMent/ShopSection/ShopSecText.html",{"form":form,"page_name":"قوانین و مقررات"})
    
def why_us_page(request):
    if request.method == 'POST':
        if WhyUs.objects.last() is not None:
            instance = WhyUs.objects.last()
            form = WhyUsForm(request.POST, instance=instance)
           
            if form.is_valid():
                form.save()
                return redirect("/ShopManageMent/WhyUs?status=true")
        else:
            form =WhyUsForm(request.POST)
        
            if form.is_valid():
                print("fuck ye")
                form.save()
                return redirect("/ShopManageMent/WhyUs?status=true")
            else:
                
                return redirect("/ShopManageMent/WhyUs?status=true")
        
    else: 
        if WhyUs.objects.last() is not None:
            instance = WhyUs.objects.last()

            form = WhyUsForm(instance=instance)
        else:
            form = WhyUsForm()
        return render(request,"ShopManageMent/ShopSection/ShopSecText.html",{"form":form,"page_name":"چرا ib7.ir?"})
    
def abut_us_page(request):
    if request.method == 'POST':
        if AbutUs.objects.last() is not None:
            instance = AbutUs.objects.last()
            form = AbutUsForm(request.POST, instance=instance)
           
            if form.is_valid():
                form.save()
                return redirect("/ShopManageMent/AbutUs?status=true")
        else:
            form =AbutUsForm(request.POST)
        
            if form.is_valid():
                print("fuck ye")
                form.save()
                return redirect("/ShopManageMent/AbutUs?status=true")
            else:
                
                return redirect("/ShopManageMent/AbutUs?status=true")
        
    else: 
        if AbutUs.objects.last() is not None:
            instance = AbutUs.objects.last()

            form = AbutUsForm(instance=instance)
        else:
            form = AbutUsForm()
        return render(request,"ShopManageMent/ShopSection/ShopSecText.html",{"form":form,"page_name":"درباره ما"})


def many_question_page(request):
    questions= TitleQuestion.objects.all()
    return render(request,"ShopManageMent/ShopSection/ManyQuestion.html",{"questions":questions})


class QuestionManager(APIView):
    def put(self,request,question_id):
        data= request.data
        question_obj = Qustion.objects.get(id=question_id)
        quest= data['quest']
        answer = data['answer']
        question_obj.quest=quest
        question_obj.answer=answer
        question_obj.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    def delete(self,request,question_id):
        question_obj = Qustion.objects.get(id=question_id)
        question_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ManyQuestionManagr(APIView):
    def get (self,request):
        qustions= TitleQuestion.objects.all()
        question_list = [{"title":question.title,"id":question.id} for question in qustions]

        return Response(status=status.HTTP_200_OK,data={"data":question_list})

    def post(self,request):
        data= request.data
        questions_title = data['question_group_name']
        questions= data['questions']
        new_title_question = TitleQuestion(title=questions_title)
        new_title_question.save()
        for question in questions:
            new_question = Qustion(quest=question['question'],answer=question['answer'])
            new_question.save()
            new_title_question.quest.add(new_question)
            

        return Response(status=status.HTTP_201_CREATED)
    def put (self,request,quest_id):
        data= request.data
        questions= data['questions']
        title_question_obj = TitleQuestion.objects.get(id=quest_id)
        title_question_obj.title=data['question_group_name']
        for question in questions:
            new_question = Qustion(quest=question['question'],answer=question['answer'])
            new_question.save()
            title_question_obj.quest.add(new_question)
        return Response(status=status.HTTP_200_OK)
        
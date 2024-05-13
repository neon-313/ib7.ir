from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from ShopManageMent.models import Product
# Create your views here.

@login_required(login_url="/")
def product_list(request):
    return render(request, 'NetworkerPanel/ProductList.html')

@login_required(login_url="/")
def home_page(request):
    return render(request, 'NetworkerPanel/Home.html')


class ProductManager(APIView):
    def get(self,request):
        product_objs = Product.objects.all()
        main_data = []
        for product_obj in product_objs:
            dic={
                "code": product_obj.product_code,
                "id": product_obj.id,
                "title":product_obj.title,
                # "main_image_url":product_obj.main_image.url,
                "price":product_obj.price,


            }
            if product_obj.main_image:
                dic['main_image_url'] = product_obj.main_image.url
            else:
                dic['main_image_url'] = ''


            main_data.append(dic)
        return Response(status=status.HTTP_200_OK,data={"data":main_data})

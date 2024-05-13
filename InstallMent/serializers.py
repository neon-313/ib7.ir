from rest_framework import serializers
from .models import *
from UserManageMent.models import UserAccount
from ShopManageMent.models import Product
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields=[
        "id",
        "is_active",
        "first_name",
        "last_name",
        "phone",
        "jtime",

        ]
class CostumerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta : 
        model = Costumer
        fields = [
            'user',
            'id',
            'firstname',
            'phonenumber',
            'lastname',
            "conteract_type",
            "conteract_date",
            "get_state",
            "get_city",
            "factors_count",
            'factor_debt',
            "factor_paid",
        ]


class FactorListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields=[
            "fake_id",
            "id",
            "costumer_name",
            "order_code",
            "persian_date",
            "kol_price",
            'peyment_type'
            


        ]



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderProduct
        fields=[
            "title",
            "price",
            "numbers",
        ]

    def validate(self, data):
     
        if not data.get('title'):
            raise serializers.ValidationError("نام محصول نمی‌تواند خالی باشد.")
        if not data.get('price'):
            raise serializers.ValidationError("تعداد محصول نمی‌تواند خالی باشد.")
        if not data.get('numbers'):
            raise serializers.ValidationError("قیمت محصول نمی‌تواند خالی باشد.")
        return data        
    



class MainProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=[
            "title",
            "id",
            "product_code",
            "price",
            'main_image',
       
        ]

class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model=Deposit
        fields="__all__"


class ChashPeymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChashPeyment
        fields=[
            'money_receiver',
            'card_numer_origin',
            'card_name_origin',
            'amount'
        ]
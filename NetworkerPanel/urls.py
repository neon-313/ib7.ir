from django.urls import path
from . import views
app_name= "NetworkerPanel"
urlpatterns = [
    path("ProductList",views.product_list,name="ProductList"),
    path("Home",views.home_page,name="Home"),
    path("ProductManager",views.ProductManager.as_view(),name="ProductManager"),
]

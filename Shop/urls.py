from django.urls import path
from . import views
app_name="ShopUrl"
urlpatterns = [


    path("ProductDetail/<int:product_code>",views.product_detail_page,name="ProductDetail"),
    path("ProductList",views.product_list_page,name="ProductList"),
    path("ProductList/<int:cat_id>",views.product_list_page,name="ProductList"),
    path("GetSize/<int:product_code>",views.get_size_by_color,name="GetSize"),
    # path("Home",views.home_page,name="Home"),
    path("Profile",views.profile_page,name="Profile"),
    path("LoginOrRegister",views.login_or_register,name="LoginOrRegister"),
    path("PhoneVerification",views.phone_verification_page,name="PhoneVerification"),
    path("CreateOrChangePass",views.change_or_create_pass,name="CreateOrChangePass"),
    path("LoginOrRegisterManager",views.LoginOrRegisterManager.as_view(),name="LoginOrRegisterManager"),
    path("LoginByPass",views.login_by_pass,name="LoginByPass"),
    path("ForgetPassword",views.forget_password,name="ForgetPassword"),
    path("login_user_bypass",views.login_user_bypass,name="login_user_bypass"),
    path("AddToCard/<int:product_code>",views.AddToCard.as_view(),name="AddToCard"),
    path("AddToCard/<int:product_code>/<int:inventory_id>",views.AddToCard.as_view(),name="AddToCard"),
    path("CardList",views.cart_list_page,name="CardList"),
    path("PeymentMethod",views.peyment_method_page,name="PeymentMethod"),
    path("NetWorkerAddresManager",views.NetWorkerAddresManager.as_view(),name="NetWorkerAddresManager"),
    path("NetWorkerAddresManager/<int:addres_id>",views.NetWorkerAddresManager.as_view(),name="NetWorkerAddresManager"),
    #Shop Static Pages 
    path("AboutUs",views.about_us_page,name="AboutUs"),
    path("WhyUs",views.why_us_page,name="WhyUs"),
    path("TermsAndRule",views.terms_and_c_page,name="TermsAndRule"),
    path("HowToBuy",views.how_to_buy_page,name="HowToBuy"),
    path("ReturnTerms",views.return_terms_page,name="ReturnTerms"),
    path("ManyQuestion",views.many_question_page,name="ManyQuestion"),

]
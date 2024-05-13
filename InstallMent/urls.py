from django.urls import path,re_path
from . import views

app_name = "instalment_app"
urlpatterns = [
    # Costomer Manage Ment begin
    path("CostumerList",views.costumer_list_page,name="CostumerList"),
    path("DepositStatus/<int:costumer_id>",views.deposits_costumer,name="DepositStatus"),

    path("DepositManageMent/<int:costumer_id>",views.DepositManageMent.as_view(),name="DepositManageMent"),
    path("DepositManageMent/<int:dep_id>/<int:costumer_id>",views.DepositManageMent.as_view(),name="DepositManageMent"),
    path("DepositManageMent",views.DepositManageMent.as_view(),name="DepositManageMent"),
    path("DeleteDeposit/<int:deposit_id>",views.delete_deposit,name="DeleteDeposit"),
    
    path("CreateCostumer",views.create_costumer_page,name="CreateCostumer"),
    
    path("CostumerDetail/<int:costumer_id>",views.costumer_detail,name="CostumerDetail"),

    path("InstallMentMangeMent",views.InstallMentMangeMent.as_view(),name="InstallMentMangeMent"),
    path("InstallMentMangeMent/<int:costumer_id>",views.InstallMentMangeMent.as_view(),name="InstallMentMangeMent"),
    path("CreatCostumer",views.CreatCostumer.as_view(),name="CreatCostumer"),
    path("EditCostumer/<int:costumer_id>",views.edit_costumer_page,name="EditCostumer"),
    path("delete_image_doc/<int:doc_id>",views.delete_image_doc,name="delete_image_doc"),


    path("DocumentImages/<int:costumer_id>",views.document_images_page,name="DocumentImages"),
    path("DocumentCostumerManageMent/<int:costumer_id>",views.CreateDocumentCostumerManageMent.as_view(),name="DocumentCostumerManageMent"),
    path("CreateDocumentCostumerManageMent",views.CreateDocumentCostumerManageMent.as_view(),name="CreateDocumentCostumerManageMent"),
    
    path("delete_document/<int:document_id>",views.delete_document,name="delete_document"),
    path("create_document/<int:costumer_id>",views.create_document,name="create_document"),
    path("FilterFactorCostumer/<int:costumer_id>",views.filter_factor_costumer,name="FilterFactorCostumer"),
    path("FilterFactorManageMent/<int:costumer_id>",views.FilterFactorManageMent.as_view(),name="FilterFactorManageMent"),

    # Costomer Manage Ment end
    #
    #Factor Manage Ment begin
    path ("FactorList",views.factor_list_page,name = "FactorList"),
    path ("CreateFactor",views.create_factor_page,name = "CreateFactor"),
    path ("CreatePeymentData",views.create_peyment_date,name = "CreatePeymentData"),
    path ("FactorImageManageMent",views.FactorImageManageMent.as_view(),name = "FactorImageManageMent"),
    path ("FactorImageManageMent/<int:factor_id>",views.FactorImageManageMent.as_view(),name = "FactorImageManageMent"),
    
    path ("ProductDetail/<int:product_id>",views.product_detail,name = "ProductDetail"),

    path ("CreatePeyment/<int:factor_id>",views.create_peyment_page,name = "CreatePeyment"),
    path ("FactorManageMent",views.FactorManageMent.as_view(),name = "FactorManageMent"),
    path ("FactorManageMent/<int:factor_id>",views.FactorManageMent.as_view(),name = "FactorManageMent"),
    path ("CreateTimeOrder",views.create_time_order,name = "CreateTimeOrder"),
    path ("FactorDetail/<int:factor_id>",views.factor_detail_page,name = "FactorDetail"),
    path ("CreatePeymentPayed/<int:peyment_id>",views.create_payed_peyment,name = "CreatePeymentPayed"),
    path ("is_payed_peyments/<int:peyment_id>",views.is_payed_peyments,name = "is_payed_peyments"),
    path ("SerchFactor",views.serch_factor_page,name = "SerchFactor"),
    path ("create_city",views.create_city,name = "create_city"),
    path ("StateDetail",views.state_detail,name = "StateDetail"),
    path ("SerchFactorPeyment",views.CerchFactorPeyment.as_view(),name = "CerchFactorPeyment"),
    path ("create_factor_new",views.create_factor_new,name = "create_factor_new"),
    path ("ChangeStatusUser/<int:user_id>",views.change_status_user,name = "ChangeStatusUser"),
    path ("PeymentTypeManageMent/<int:factor_id>",views.PeymentTypeManageMent.as_view(),name = "PeymentTypeManageMent"),
    path ("CheckImageManager",views.CheckImageManager.as_view(),name = "CheckImageManager"),
    path ("create_factor_code",views.create_factor_code,name = "create_factor_code"),
    path ("ImageChekPeyDeposit",views.ImageChekPeyDeposit.as_view(),name="ImageChekPeyDeposit"),
    
    path ("CheckPeymentList",views.check_peyment_page,name="CheckPeymentList"),
    path ("CheckPeymentManager",views.CheckPeymentManager.as_view(),name="CheckPeymentManager"),
    path ("CheckPeymentManager/<int:check_id>",views.CheckPeymentManager.as_view(),name="CheckPeymentManager"),

    #Factor Manage Ment end
    #main_product_api begin
    path ("MainProductList",views.main_product_list,name="MainProductList"),
    path ("BankAccount",views.bank_acc_page,name="BankAccount"),
    path ("BankAccountManageMent",views.BankAccountManageMent.as_view(),name="BankAccountManageMent"),
    path ("BankAccountManageMent/<int:bankacc_id>",views.BankAccountManageMent.as_view(),name="BankAccountManageMent"),
    path ("EditFactor/<int:factor_id>",views.edit_factor_page,name = "EditFactor"),
    path ("ChangeFactorImage/<int:factor_id>",views.ChangeFactorImage.as_view(),name = "ChangeFactorImage"),

    #Factor Manage Ment end
    #main_product_api begin

    path ("peyment_method/<int:type>",views.peyment_method,name="peyment_method"),
    path("PostSmsManageMent",views.PostSmsManageMent.as_view(),name="PostSmsManageMent"),
    path("PostSmsManageMent/<int:post_id>",views.PostSmsManageMent.as_view(),name="PostSmsManageMent"),
    path("PostSmsList",views.postsms_list_page,name="PostSmsList"),
    path("SendSms/<int:post_id>",views.send_sms_post,name="SendSms"),
    #main_product_api end
#@_mahsa.rastegar_
]


    

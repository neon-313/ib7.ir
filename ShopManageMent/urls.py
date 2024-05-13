from django.urls import path
from . import views
app_name= "ShopManageMentUrl"
urlpatterns = [
    path("ProductList",views.product_list_page,name="ProductList"),
    path("EditProduct/<int:product_id>",views.edit_product_page,name="EditProduct"),
    path("CreateProduct",views.create_product_page,name="CreateProduct"),
    path("AddMainFileProduct",views.add_main_file_product,name="AddMainFileProduct"),
    path("DeleteMainFileProduct",views.delete_main_image_product,name="DeleteMainFileProduct"),
    path("GaleryImageProduct",views.GaleryImageProduct.as_view(),name="GaleryImageProduct"),
    path("ProductManageMent",views.ProductManageMent.as_view(),name="ProductManageMent"),
    path("ProductManageMent/<int:product_id>",views.ProductManageMent.as_view(),name="ProductManageMent"),

    path("ChangeMainImageRro/<int:product_id>",views.chagne_main_image_product,name="ChangeMainImageRro"),
    path("DeleteMainImagePro/<int:product_id>",views.delete_main_image_pro,name="DeleteMainImagePro"),
    path("add_galery_image_topro/<int:product_id>",views.add_galery_image_topro,name="add_galery_image_topro"),
    path("delete_galery_image",views.delete_galery_image,name="delete_galery_image"),
    
    
    
    path("delete_main_image/<int:product_id>",views.delete_main_image,name="delete_main_image"),
    path("delete_g_image/<int:g_id>",views.delete_g_image,name="delete_g_image"),

    #CatehoryThree Begin 

    path("CategoryThree",views.category_three_page,name="CategoryThree"),
    path("CategoryThreeManager",views.CategoryThreeManager.as_view(),name="CategoryThreeManager"),
    path("CategoryThreeManager/<int:cat_id>",views.CategoryThreeManager.as_view(),name="CategoryThreeManager"),
    #CatehoryThree end

    #CatehoryTwo begin
    path("CategoryTwo",views.category_two_page,name="CategoryTwo"),
    path("CategoryTwoManager",views.CategoryTwoManager.as_view(),name="CategoryTwoManager"),
    path("CategoryTwoManager/<int:cat_id>",views.CategoryTwoManager.as_view(),name="CategoryTwoManager"),
    #CatehoryTwo end
    #Catehoryone begin

    path("CategoryOne",views.category_one_page,name="CategoryOne"),
    path("CategoryOneManager",views.CategoryOneManager.as_view(),name="CategoryOneManager"),
    path("CategoryOneManager/<int:cat_id>",views.CategoryOneManager.as_view(),name="CategoryOneManager"),

    # Category One ENd

    #ColorManager begin
    
    path("ColorList",views.color_list_page,name="ColorList"),
    path("ColorManager",views.ColorManager.as_view(),name="ColorManager"),
    path("ColorManager/<int:color_id>",views.ColorManager.as_view(),name="ColorManager"),
    #ColorManager end

    #SizeManager begin
    path("SizeList",views.size_list_page,name="SizeList"),
    path("SizeManager",views.SizeManager.as_view(),name="SizeManager"),
    path("SizeManager/<int:size_id>",views.SizeManager.as_view(),name="SizeManager"),

    #SizeManager end
    
    #Inventory Manager Begin
    path("InventoryList",views.inventorylist,name="InventoryList"),
    path("CreateOrEditInv/<int:product_id>",views.create_or_edit_inv_page,name="CreateOrEditInv"),
    
    path("InventoryManager",views.InventoryManager.as_view(),name="InventoryManager"),
    path("InventoryManager/<int:product_id>",views.InventoryManager.as_view(),name="InventoryManager"),
    path("error_text",views.error_text,name="error_text"),
    #Inventory Manager End

    #property and specifications
    path("PropertyManager/<int:property_id>",views.PropertyManager.as_view(),name="PropertyManager"),
    path("SpeciFicationManager/<int:sep_id>",views.SpeciFicationManager.as_view(),name="SpeciFicationManager"),
    #property and specifications
    path("ShowFilterManager/<int:show_id>",views.ShowFilterManager.as_view(),name="ShowFilterManager"),
    path("ShowFilterManager",views.ShowFilterManager.as_view(),name="ShowFilterManager"),
    path("ProductFilter",views.show_filter_page,name="show_filter_page"),
    path("SliderImage",views.slider_image_page,name="SliderImage"),
    path("SliderImageManager",views.SliderImageManager.as_view(),name="SliderImageManager"),
    path("SliderImageManager/<int:image_id>",views.SliderImageManager.as_view(),name="SliderImageManager"),
    path("AddSliderImageSession",views.AddSliderImageSession.as_view(),name="AddSliderImageSession"),
    path("ReturnTerms",views.return_terms_page,name="ReturnTerms"),
    path("HowToBuy",views.how_to_buy_page,name="HowToBuy"),
    path("TermsAndConditions",views.terms_and_c_page,name="TermsAndConditions"),
    path("WhyUs",views.why_us_page,name="WhyUs"),
    path("AbutUs",views.abut_us_page,name="AbutUs"),
    path("ManyQuestionManagr",views.ManyQuestionManagr.as_view(),name="ManyQuestionManagr"),
    path("ManyQuestionManagr/<int:quest_id>",views.ManyQuestionManagr.as_view(),name="ManyQuestionManagr"),
    path("QuestionManager/<int:question_id>",views.QuestionManager.as_view(),name="QuestionManager"),
    path("QuestionManager",views.QuestionManager.as_view(),name="QuestionManager"),
    path("ManyQuestion",views.many_question_page,name="ManyQuestion"),


]
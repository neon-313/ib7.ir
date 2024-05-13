from django.urls import path
from . import views
app_name="HomePageUrl"
urlpatterns = [
    path("HomePage",views.home_page,name="HomePage")
    
]

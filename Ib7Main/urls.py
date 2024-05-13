
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from UserManageMent.views import login_page
from Shop.views import home_page
from . import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('manager/login', login_page),
    path('', home_page),
    path("InstallMent/",include("InstallMent.urls")),
    path("UserManageMent/",include("UserManageMent.urls")),
    path("Dashbord/",include("HomePage.urls")),
    path("ShopManageMent/",include("ShopManageMent.urls")),
    path("Networker/",include("NetworkerPanel.urls")),
    path("Market/",include("Shop.urls")),
    path('ckeditor/', include('ckeditor_uploader.urls')),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

from django.urls import path
from . import views
app_name = "UserManageMentUrl"

urlpatterns = [
    
    path("auth_user",views.auth_user ,name="auth_user"),
    path("UserList",views.user_management_page ,name="UserList"),
    path("UserManageMent",views.UserManageMent.as_view() ,name="UserManageMent"),
    path("UserManageMent/<int:user_id>",views.UserManageMent.as_view() ,name="UserManageMent"),
    path("ChangePsswordUser/<int:user_id>",views.ChangePsswordUser.as_view() ,name="ChangePsswordUser"),
    path("create_permisiions_group",views.create_permisiions_group ,name="create_permisiions_group"),
    path("ChangePermission/<int:user_id>",views.change_permission_user ,name="ChangePermission"),

]

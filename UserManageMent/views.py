
from django.shortcuts import render
from django.contrib.auth import authenticate,login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserAccount,GroupPermissionn
from .serializers import UserSerializer
from InstallMent.models import State

# Create your views here.
from django.contrib.auth.models import Group
def login_page(request):

    # if request.POST:
    #     print(request.POST,"!@5125")
    # new_user= UserAccount(
    #     username= "neon.313"
    # )
    # new_user.set_password("neon.313")
    # new_user.save()
    return render(request,"UserManageMent/login.html")

@api_view(['POST'])
def auth_user(request):
    data= request.data
    username = data['username']
    password = data['password']
    user = authenticate(username=username,password=password)
    if user:
        user_obj =UserAccount.objects.get(username=username)
        login(request,user)
        return Response(status=status.HTTP_200_OK,data={"redirect_url":"/InstallMent/CostumerList"})
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"نام کاربری یا رمز عبور اشتباه میباشد"})
    

    
        


def user_management_page(request):
    # users_perm=[]
    # for user in UserAccount.objects.all():
    #     user_detail={
    #         "id":user.id
    #     }
    #     permissions= []
    #     for g_per in GroupPermissionn.objects.all():
            
    #         dic={}
    #         dic['permission_name']=g_per.group_name
    #         dic['read'] = False
    #         dic['edit'] = False
    #         dic['delete'] = False
    #         dic['create'] = False
    #         if user.id in g_per.read:
    #             dic['read']= True
    #         if user.id in g_per.create:
    #             dic['create']= True
    #         if user.id in g_per.delete:
    #             dic['delete']= True
    #         if user.id in g_per.edit:
    #             dic['edit']= True
    #         permissions.append(dic)
    #     user_detail['permissions']=permissions
        
    #     users_perm.append(user_detail)
    # print(users_perm)
            # if g_per not in user.user_permission.all():
                # if g_per.
     
        
                
     
 
    
    return render(request,"UserManageMent/UserManageMent/UserList.html",{"states":State.objects.all(),"users":UserAccount.objects.all()})

class UserManageMent(APIView):
    def get (self, request):
        users = UserAccount.objects.all()
        data = UserSerializer(users,many=True).data

        return Response (status = status.HTTP_200_OK,data={"data":data})       
    def post (self,request):
        data= request.data 
   
        first_name = data['first_name']
        last_name = data['last_name']
        username = data['username']
        state = data['state']
        city = data['city']
        password = data['password']
        confirm_password = data['confirm_password']
        phone = data['phone']

        if UserAccount.objects.filter(username=username).exists():
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"نام کاربری از قبل وجود دارد"})
        a=0
        for item in password:
            a+=1

        if a<8:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"رمز عبور باید بیشتر از 8 حرف  باشد"})
        if confirm_password == password:
            new_user = UserAccount(
                first_name=first_name,
                last_name=last_name,
                username=username,
                state=state,
                city=city,
                phone=phone

            )
            new_user.set_password(password)
            new_user.save()

            return Response(status= status.HTTP_201_CREATED,data={'message':"کاربر مورد نظر با موفقیت ثبت شد"})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"رمز عبور ها شباهت ندارد"})

    def put (self,request,user_id):
        data= request.data
        user_instance = UserAccount.objects.get(id=user_id)

        first_name = data['first_name']
        last_name = data['last_name']
        username = data['username']
        state = data['state']
        city = data['city']
        phone = data['phone']
        try :
            chek_user = UserAccount.objects.get(username=username)
            if chek_user.id == user_instance.id:
                user_instance.first_name=first_name
                user_instance.last_name=last_name
                user_instance.state=state
                user_instance.city=city
                user_instance.phone=phone 
                user_instance.save()
                
                return Response(status=status.HTTP_202_ACCEPTED,data={"message":"کاربر مورد نظر با موفقیت ویرایش شد"})
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST,data={"message":"نام کاربری انتخاب شده از قبل وجود دارد"})
        except:
                user_instance.username=username
                user_instance.first_name=first_name
                user_instance.last_name=last_name
                user_instance.state=state
                user_instance.city=city
                user_instance.phone=phone 
                user_instance.save()
                return Response(status=status.HTTP_202_ACCEPTED,data={"message":"کاربر مورد نظر با موفقیت ویرایش شد"})
    def delete(self,request,user_id):
        user_instance = UserAccount.objects.get(id=user_id)
        user_instance.delete()
        return Response(status=status.HTTP_202_ACCEPTED,data={"message":"کاربر مورد نظر با موفقیت انجام شد"})
    

class ChangePsswordUser(APIView):
    def post(self,request,user_id):
        user_instance = UserAccount.objects.get(id=user_id)
        data = request.data
        password = data['password']
        confirm_password= data['confirm_password']
        if len(password)< 8:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"رمز عبور باید بیشتر از 8 رقم باشد"})
        if confirm_password != password:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={"message":"رمز عبور ها  با هم شباهت ندارند"})
        user_instance.set_password(password)
        user_instance.save()
        return Response(status=status.HTTP_200_OK,data={"message":"رمز عبور با موفقیت بروزرسانی شد"})


            
@api_view(['GET'])
def change_permission_user(request,user_id):
    if request.method == 'GET':
        user_obj=UserAccount.objects.get(id=user_id)
        perm_name=request.GET.get("perm_name")
        checked = request.GET.get("checked")
        typee = request.GET.get("type")
        group_perm = GroupPermissionn.objects.get(group_name=perm_name)
      
        if checked ==  "true":
            print(f"{group_perm}.{typee}")
        else:
            print(f"{group_perm}.{typee}")
            print("Fuck No")
        return Response(status=status.HTTP_200_OK)
            
@api_view(['GET'])
def create_permisiions_group(request):
    groups = [
        "خیاط ها",
        "برش ها",
        "موجودی برش ها",
        "وضعیت برش ها",
        "کاربر ها"
    ]
    for group in groups:
        new_group_per= GroupPermissionn(
            group_name=group,
            read=[],
            create=[],
            delete=[],
            edit=[]
        )
        new_group_per.save()
  
    return Response(status= status.HTTP_200_OK)
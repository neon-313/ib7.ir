# from django.forms import ModelForm,CheckboxInput
# from .models import UserAccount
# class UserPermissionForm(ModelForm):
#     class Meta:
#         model=UserAccount
#         fields =[
#             "tailor_read",
#             "tailor_create",
#             "tailor_edit",
#             "tailor_delete",
#         ]
#         widgets ={
#             "tailor_read":CheckboxInput(attrs={"class":"form-check-input mt-0","type":"checkbox", "id":"tailor_read"}),
#             "tailor_create":CheckboxInput(attrs={"class":"form-check-input mt-0","type":"checkbox", "id":"tailor_create"}),
#             "tailor_edit":CheckboxInput(attrs={"class":"form-check-input mt-0","type":"checkbox", "id":"tailor_edit"}),
#             "tailor_delete":CheckboxInput(attrs={"class":"form-check-input mt-0","type":"checkbox", "id":"tailor_delete"}),
#         }
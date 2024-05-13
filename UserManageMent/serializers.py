from rest_framework import serializers
from .models import UserAccount

class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields=[
            "id",
            "first_name",
            "last_name",
            "phone",
            "get_state",
            "get_city",
            "username",
            "jtime",

        ]

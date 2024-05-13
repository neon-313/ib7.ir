from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import ReturnTerms,HowToBuy,TermsAndConditions,WhyUs,AbutUs


class ReturnTermsForm(forms.ModelForm):
    class Meta:
        model=ReturnTerms
        fields=[
            'text'
        ]
        widgets={
            "text":CKEditorWidget()            
        }
class HowToBuyForm(forms.ModelForm):
    class Meta:
        model=HowToBuy
        fields=[
            'text'
        ]
        widgets={
            "text":CKEditorWidget()            
        }
class TermsAndConditionsForm(forms.ModelForm):
    class Meta:
        model=TermsAndConditions
        fields=[
            'text'
        ]
        widgets={
            "text":CKEditorWidget()            
        }
class WhyUsForm(forms.ModelForm):
    class Meta:
        model=WhyUs
        fields=[
            'text'
        ]
        widgets={
            "text":CKEditorWidget()            
        }
class AbutUsForm(forms.ModelForm):
    class Meta:
        model=AbutUs
        fields=[
            'text'
        ]
        widgets={
            "text":CKEditorWidget()            
        }
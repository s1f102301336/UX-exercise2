from django import forms
from .models import Spot

class SpotForm(forms.ModelForm):
    class Meta:
        model = Spot
        fields = [
            'time',
            'weather',
            'season',
            'title',
            'image',
            'description',
            'business_hours',
            'fees',
            'access',
            'address',
        ]
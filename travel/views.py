from django.shortcuts import render, redirect
from .models import Spot
from .forms import SpotForm

# Create your views here.

def index(request):
    return render(request, 'travel/index.html')

def create_spot(request):
    print(request)
    print(request.POST)
    if request.method == 'POST':
        form = SpotForm(request.POST, request.FILES)#requestの内容をFormに送り、Formが自動的にmodel化する
        if form.is_valid():#modelに設定した制限に当てはまるか検証
            spot_data = Spot()
            if request.FILES:
                spot_data.image = request.FILES.get('image') 
                # print('imageです',spot_data.image)
            post = form.save(commit=False)
            post.save()
            # print(post.pk)
            return redirect('/create_spot')
        else:
            print(form.errors)#「必須です」とconsole表示、リダイレクト
    else:
        form = SpotForm()

    return render(request, "travel/forms.html",{'form':form}) 
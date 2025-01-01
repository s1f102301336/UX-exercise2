from django.db import models

# Create your models here.


class Spot(models.Model):
    class Time(models.TextChoices):
        Morning = 'Morning'
        Noon = 'Noon'
        Night = 'Night'
    class Weather(models.TextChoices):
        Sunny = 'Sunny'
        Cloudy = 'Cloudy'
        Rainy = 'Rainy'
    class Season(models.TextChoices):
        Spring = 'Spring'
        Summer = 'Summer'
        Fall = 'Fall'
        Winter = 'Winter'

    time = models.CharField(
        max_length=20,
        choices=Time.choices,
        default=Time.Noon,
    )
    weather = models.CharField(
        max_length=20,
        choices=Weather.choices,
        default=Weather.Sunny,
    )
    season = models.CharField(
        max_length=20,
        choices=Season.choices,
        default=Season.Spring,
    )
    title = models.CharField(max_length=30)
    image = models.ImageField(upload_to='images', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    access = models.CharField(max_length=20)
    address = models.CharField(max_length=20)
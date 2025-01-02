from django.db import models

# Create your models here.


class Spot(models.Model):
    class Time(models.TextChoices):
        Morning = 'Morning'
        Noon = 'Noon'
        Night = 'Night'
        All_the_Day = 'All_the_Day'
    class Weather(models.TextChoices):
        Sunny = 'Sunny'
        Cloudy = 'Cloudy'
        Rainy = 'Rainy'
        All_Weather = 'All_Weather'
    class Season(models.TextChoices):
        Spring = 'Spring'
        Summer = 'Summer'
        Fall = 'Fall'
        Winter = 'Winter'
        All_Season = 'All_Season'

    time = models.CharField(
        max_length=20,
        choices=Time.choices,
        default=Time.All_the_Day,
    )
    weather = models.CharField(
        max_length=20,
        choices=Weather.choices,
        default=Weather.All_Weather,
    )
    season = models.CharField(
        max_length=20,
        choices=Season.choices,
        default=Season.All_Season,
    )
    title = models.CharField(max_length=30)
    image = models.ImageField(upload_to='images', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    business_hours = models.TextField(null=True, blank=True)
    fees = models.TextField(null=True, blank=True)
    access = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
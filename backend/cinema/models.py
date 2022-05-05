from django.db import models
from djongo.models import EmbeddedField, ArrayField
from mongoengine import ListField


class Movie(models.Model):
    title = models.CharField(max_length=255, blank=False, default='')
    date = models.DateTimeField(blank=False)


# class Termin(models.Model):
#     date = models.DateTimeField()
#     reservations = ListField(EmbeddedField())
#     max_places
#
#
# class Reservation(models.Model):
#     firstname
#     lastname
#     email
#     number_of_people

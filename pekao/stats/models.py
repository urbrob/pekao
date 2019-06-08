from django.db import models
from users.models import User


class Employer(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True, editable=False)
    location = models.CharField(max_length=255)
    coordinates = models.CharField(max_length=255)
    branch_of_business = models.CharField(max_length=255)
    def __str__(self):
        return self.name


class Raport(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    customers = models.BigIntegerField()
    new_customers =  models.IntegerField()
    regular_customers = models.IntegerField()
    new_regular_customers = models.IntegerField()
    profit = models.IntegerField()
    transaction_counts = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True, editable=False)


class Terminal(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True, editable=False)

    def __str__(self):
        return "Terminal: {}".format(self.id)


class Payment(models.Model):
    card_namber = models.CharField(max_length=25)
    value = models.FloatField()
    method = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    coordinates = models.CharField(max_length=255)
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True, editable=False)

    def __str__(self):
        return "Payment: {}".format(self.id)

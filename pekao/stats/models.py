from django.db import models

<<<<<<< master
# Create your models here.
=======
class Employer(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    api_partner_id = models.IntegerField()
    name = models.CharField(max_length=100)
    modified_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    localization = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Terminal(models.Model):
    api_terminal_id = models.IntegerField()
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    modified_date = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return "Terminal: {}".format(self.terminal_id)


class Payment(models.Model):
    api_payment_id = models.IntegerField()
    card_namber = models.CharField(max_length=25)
    transaction_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    value = models.FloatField()
    method = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE)

    def __str__(self):
        return "Payment: {}".format(self.payment_id)
>>>>>>> local

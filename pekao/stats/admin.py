from django.contrib import admin
from stats.models import Employer, Terminal, Payment, Raport, Product

@admin.register(Employer)
class EmployerAdmin(admin.ModelAdmin):
    pass

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Terminal)
class TerminalAdmin(admin.ModelAdmin):
    search_fields = ['employer', 'created_at', 'modified_at']
    fields = ('employer',)
    list_display = ('employer', 'created_at', 'modified_at')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    search_fields = ['card_number', 'value', 'method', 'region', 'country', 'location', 'terminal', 'created_at', 'modified_at']
    fields = ('card_number', 'value', 'method', 'region', 'country', 'location', 'terminal')
    list_display = ('card_number', 'value', 'method', 'region', 'country', 'location', 'terminal', 'created_at', 'modified_at')


@admin.register(Raport)
class RaportAdmin(admin.ModelAdmin):
    search_fields = ['employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts', 'created_at', 'modified_at']
    fields = ('employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts')
    list_display = ('employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts', 'created_at', 'modified_at')

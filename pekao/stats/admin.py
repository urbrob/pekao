from django.contrib import admin
from stats.models import Employer, Terminal, Payment, Raport

@admin.register(Employer)
class EmployerAdmin(admin.ModelAdmin):
    search_fields = ['owner', 'name', 'created_at', 'modified_at', 'location', 'coordinates', 'branch_of_business']
    fields = ('owner', 'name', 'location', 'coordinates', 'branch_of_business')
    list_display = ('owner', 'name', 'created_at', 'modified_at', 'location', 'coordinates', 'branch_of_business')


@admin.register(Terminal)
class TerminalAdmin(admin.ModelAdmin):
    search_fields = ['employer', 'created_at', 'modified_at']
    fields = ('employer',)
    list_display = ('employer', 'created_at', 'modified_at')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    search_fields = ['card_namber', 'value', 'method', 'region', 'country', 'location', 'coordinates', 'terminal', 'created_at', 'modified_at']
    fields = ('card_namber', 'value', 'method', 'region', 'country', 'location', 'coordinates', 'terminal')
    list_display = ('card_namber', 'value', 'method', 'region', 'country', 'location', 'coordinates', 'terminal', 'created_at', 'modified_at')


@admin.register(Raport)
class RaportAdmin(admin.ModelAdmin):
    search_fields = ['employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts', 'created_at', 'modified_at']
    fields = ('employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts')
    list_display = ('employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts', 'created_at', 'modified_at')

from django.contrib import admin
from stats.models import Employer, Terminal, Payment, Raport

@admin.register(Employer)
class EmployerAdmin(admin.ModelAdmin):
    search_fields = ['owner', 'name', 'created_at', 'modified_at', 'location', 'branch_of_business']
    fields = ('owner', 'name', 'location', 'branch_of_business')
    list_display = ('owner', 'name', 'created_at', 'modified_at', 'location', 'branch_of_business','lat','lon')


@admin.register(Terminal)
class TerminalAdmin(admin.ModelAdmin):
    search_fields = ['employer', 'created_at', 'modified_at']
    fields = ('employer',)
    list_display = ('employer', 'created_at', 'modified_at')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    pass


@admin.register(Raport)
class RaportAdmin(admin.ModelAdmin):
    search_fields = ['employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts', 'created_at', 'modified_at']
    fields = ('employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts')
    list_display = ('employer', 'customers', 'new_customers', 'regular_customers', 'new_regular_customers', 'profit', 'transaction_counts', 'created_at', 'modified_at')

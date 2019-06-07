from django.contrib import admin
from stats.models import Employer, Terminal, Payment

@admin.register(Employer)
class EmployerAdmin(admin.ModelAdmin):
    search_fields = ['owner', 'partner_id', 'name', 'modified_date', 'localization']
    fields = ('owner', 'partner_id', 'name', 'modified_date', 'localization')
    list_display = ('owner', 'partner_id', 'name', 'modified_date', 'localization')


@admin.register(Terminal)
class TerminalAdmin(admin.ModelAdmin):
    search_fields = ['terminal_id', 'employer', 'modified_date']
    fields = ('terminal_id', 'employer', 'modified_date')
    list_display = ('terminal_id', 'employer', 'modified_date')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    search_fields = ['payment_id', 'card_namber', 'transaction_time', 'value', 'method', 'region', 'country', 'terminal']
    fields = ('payment_id', 'card_namber', 'transaction_time', 'value', 'method', 'region', 'country', 'terminal')
    list_display = ('payment_id', 'card_namber', 'transaction_time', 'value', 'method', 'region', 'country', 'terminal')

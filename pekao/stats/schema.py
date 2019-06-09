from graphene_django import DjangoObjectType
from django.db.models.functions import TruncMonth, TruncDay
from stats.models import User, Terminal, Payment, Raport, Employer, Employee, Shift, Product
from django.db.models import Count, Sum
from collections import defaultdict
from datetime import datetime
import calendar
import graphene
import json
import datetime as dt


class EmployerNode(DjangoObjectType):
    class Meta:
        model = Employer

class EmployeeNode(DjangoObjectType):
    class Meta:
        model = Employee


class ShiftNode(DjangoObjectType):
    class Meta:
        model = Shift


class TerminalNode(DjangoObjectType):
    class Meta:
        model = Terminal


class PaymentNode(DjangoObjectType):
    class Meta:
        model = Payment

class RaportNode(DjangoObjectType):
    class Meta:
        model = Raport


class ProductNode(DjangoObjectType):
    class Meta:
        model = Product


class CustomersCount(graphene.ObjectType):
    customer_count = graphene.Int()

    def resolve_customer_count(self, info):
        return self


class RegularCustomer(graphene.ObjectType):
    regular_customer = graphene.Boolean()

    def resolve_regular_customer(self, info):
        return self


class CreateRaportMutation(graphene.Mutation):
    class Arguments:
        employer = graphene.Int()

    status = graphene.String()

    def mutate(self, info, **kwargs):
        # generateraport(kwargs['employer'])
        return CreateRaportMutation(status='OK')


class RaportNode(DjangoObjectType):
    class Meta:
        model = Raport


class DayStats(graphene.ObjectType):
    amount = graphene.Int()
    name = graphene.String()
    count = graphene.Int()

    def resolve_name(self, info):
        return self['name']

    def resolve_amount(self, info):
        return self['amount']

    def resolve_count(self, info):
        return self['count']


class HeatPointNode(graphene.ObjectType):
    employer_loc = graphene.Float()
    employer_name = graphene.String()
    trans_score = graphene.Int()
    employer_lat = graphene.Float()
    employer_long = graphene.Float()

    def resolve_employer_loc(self, info):
        return self['employer_loc']

    def resolve_employer_name(self, info):
        return self['employer_name']

    def resolve_trans_score(self, info):
        return self['trans_score']

    def resolve_employer_lat(self, info):
        return self['employer_lat']

    def resolve_employer_long(self, info):
        return self['employer_long']


class ConsumerMonthStats(graphene.ObjectType):
    name = graphene.String()
    customers = graphene.Int()
    new_customers = graphene.Int()
    lost_customers = graphene.Int()

    def resolve_name(self, info):
        return self['name']

    def resolve_customers(self, info):
        return self['payments'].order_by('card_number').values('card_number').distinct().count()

    def resolve_new_customers(self, info):
        return self['payments'].order_by('card_number').values('card_number').distinct().count() / 100

    def resolve_lost_customers(self, info):
        return self['payments'].order_by('card_number').values('card_number').distinct().count() / 1000


class MonthStats(graphene.ObjectType):
    name = graphene.String()
    amount = graphene.Int()
    count = graphene.Int()
    days = graphene.List(DayStats)

    def resolve_name(self, info):
        return self['name']

    def resolve_amount(self, info):
        return self['amount']

    def resolve_count(self, info):
        return self['count']

    def resolve_days(self, info):
        days = [{'name': month, 'count': 0, 'amount': 0} for month in range(1, 31)]
        for payment in self['days']:
            days[payment.created_at.month]['count'] += 1
            days[payment.created_at.month]['amount'] += payment.value
        return days


class AddEmployee(graphene.Mutation):
    class Arguments:
        employer = graphene.Int()
        name = graphene.String()
        surname = graphene.String()

    employee = graphene.Field(EmployeeNode)

    def mutate(self, info, **kwargs):
        return AddEmployee(Employee.objects.create(**kwargs))


class DeleteEmployee(graphene.Mutation):
    class Arguments:
        employees = graphene.List(graphene.String)

    status = graphene.String()

    def mutate(self, info, **kwargs):
        for employee in kwargs['employees']:
            Employee.objects.filter(id=int(employee)).delete()
        return DeleteEmployee(status='OK')


class DayOfWeekEnum(graphene.Enum):
    MONDAY = Shift.MONDAY
    TUESDAY = Shift.TUESDAY
    WEDNESDAY = Shift.WEDNESDAY
    THURSDAY = Shift.THURSDAY
    FRIDAY = Shift.FRIDAY
    SATURDAY = Shift.SATURDAY
    SUNDAY = Shift.SUNDAY


class AddShift(graphene.Mutation):
    class Arguments:
        employee = graphene.Int()
        start_at = graphene.String()
        end_at = graphene.String()
        manager = graphene.Boolean()
        day_of_week = DayOfWeekEnum()

    shift = graphene.Field(ShiftNode)

    def mutate(self, info, **kwargs):
        return AddShift(Shift.objects.create(**kwargs))


class DeleteShift(graphene.Mutation):
    class Arguments:
        shift = graphene.Int()

    status = graphene.String()

    def mutate(self, info, **kwargs):
        Shift.objects.filter(id=kwargs['shift'])
        return DeleteShift(status='OK')


class StatsNode(graphene.ObjectType):
    months = graphene.List(MonthStats)

    def resolve_months(self, info):
        return self

class CustomerNode(graphene.ObjectType):
    months = graphene.List(MonthStats)

    def resolve_months(self, info):
        return self


class InnerProduct(graphene.ObjectType):
    name = graphene.String()
    price = graphene.String()

    def resolve_name(self, info):
        return self['name']

    def resolve_price(self, info):
        return self['price']


class ListProducts(graphene.ObjectType):
    products = graphene.List(InnerProduct)

    def resolve_products(self, info):
        return self


class InnerProductInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    price = graphene.Float(required=True)


class PaymentMutation(graphene.Mutation):
    class Arguments:
        card_number = graphene.String()
        value = graphene.Float()
        method = graphene.String()
        region = graphene.String()
        country = graphene.String()
        location = graphene.String()
        lat = graphene.Float()
        lon = graphene.Float()
        terminal = graphene.Int()

        products = graphene.List(InnerProductInput)

    ok = graphene.Boolean()

    def mutate(self, info, **kwargs):
        payment = Payment.objects.create(
            card_number = kwargs['card_number'],
            value = kwargs['value'],
            method = kwargs['method'],
            region = kwargs['region'],
            country = kwargs['country'],
            location = kwargs['location'],
            lat = kwargs['lat'],
            lon = kwargs['lon'],
            terminal_id=kwargs['terminal']
        )
        for p in kwargs['products']:
            Product.objects.create(
                name = p.name,
                price = p.price,
                payment_id = payment.id
            )
        return PaymentMutation(ok=True)


class Mutation(graphene.ObjectType):
    create_raport = CreateRaportMutation.Field()
    add_employee = AddEmployee.Field()
    delete_employee = DeleteEmployee.Field()
    add_shift = AddShift.Field()
    delete_shift = DeleteShift.Field()
    payment = PaymentMutation.Field()


class Query(graphene.ObjectType):
    raports = graphene.List(RaportNode)
    statistics = graphene.Field(StatsNode)
    payment_heatmap_points = graphene.List(HeatPointNode)
    my_staff = graphene.List(EmployeeNode)
    payment = graphene.Field(PaymentNode, id=graphene.Int())
    customers = graphene.List(ConsumerMonthStats)
    regular_customer = graphene.Field(RegularCustomer, employer_id=graphene.Int(), card_number=graphene.String())
    new_customer = graphene.Field(RegularCustomer, employer_id=graphene.Int(), card_number=graphene.String())
    how_many_lost_customer = graphene.Field(CustomersCount, employer_id=graphene.Int())


    def resolve_payment_heatmap_points(self, info, **kwargs):
        points_map = []
        now = datetime.now()
        month_ago = now - dt.timedelta(weeks=4)
        for loc in Employer.objects.all():
            point = {
                "employer_loc": loc.location,
                "employer_name": loc.name,
                "trans_score": Payment.objects.filter(terminal__employer=loc, created_at__lt=now, created_at__gt=month_ago).count(),
                "employer_lat": loc.lat,
                "employer_long": loc.lon
            }
            points_map.append(point)
        return points_map

    def resolve_my_staff(self, info, **kwargs):
        return Employee.objects.filter(employer__owner=info.context.user)

    def resolve_payments(self, **kwargs):
        if kwargs['id'] is not None:
            return Payment.objects.get(pk=kwargs['id'])
        return 0

    def resolve_raports(self, info):
        return Raport.objects.filter(employer__owner=info.context.user)

    def resolve_statistics(self, info):
        months = [{'name': calendar.month_name[month], 'number': month, 'count': 0, 'amount': 0, 'days': []} for month in range(1, 13)]
        for payment in Payment.objects.filter(terminal__employer__owner=info.context.user):
            months[payment.created_at.month]['count'] += 1
            months[payment.created_at.month]['amount'] += payment.value
            months[payment.created_at.month]['days'].append(payment)
        return months

    def resolve_customers(self, info, **kwargs):
        months = []
        payments = Payment.objects.filter(terminal__employer__owner=info.context.user)
        for month in range(1, 13):
            months.append(
                {
                    'name': calendar.month_name[month],
                    'payments': payments.filter(created_at__month=month),
                }
            )
        return months


"""    def resolve_regular_customer(self, info, **kwargs):
        return temp_regular_customer(44, 14, 5, **kwargs)

    def resolve_new_customer(self, info, **kwargs):
        if temp_regular_customer(44, 14, 5, **kwargs) == False:
            return temp_regular_customer(14, 0, 1, **kwargs)
        return False

    def resolve_how_many_lost_customer(self, info, **kwargs):
        before = count_customer_in_time(60, 30, **kwargs)
        now = count_customer_in_time(30, 0, **kwargs)
        return before - now

"""
def count_customer_in_time(arg_start, arg_end, **kwargs):
    now = date.today()
    start = now - timedelta(days=arg_start)
    end = now - timedelta(days=arg_end)
    return Payment.objects.filter(
        created_at__range=[start, end],
        terminal__in=Terminal.objects.filter(employer=kwargs['employer_id'])
        ).annotate(Count('card_number', distinct=True)).count()


def temp_regular_customer(arg_start, arg_end, value, **kwargs):
    now = date.today()
    start = now - timedelta(days=arg_start)
    end = now - timedelta(days=arg_end)
    payment = Payment.objects.filter(
        terminal__in=Terminal.objects.filter(employer=kwargs['employer_id']),
        created_at__range=[start, end],
        card_number=kwargs['card_number']).annotate(Count('card_number', distinct=False)
    ).count()
    if payment > value:
        return True
    return False

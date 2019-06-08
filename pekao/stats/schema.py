import pdb
from graphene_django import DjangoObjectType
from django.db.models.functions import TruncMonth, TruncDay
from stats.models import User, Terminal, Payment, Raport, Employer, Employee, Shift
from django.db.models import Count, Sum
from collections import defaultdict
from datetime import datetime
import calendar
import graphene
import json
from datetime import datetime
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
        employee = graphene.Int()

    status = graphene.String()

    def mutate(self, info, **kwargs):
        Employee.objects.filter(id=kwargs['employee'])
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


class Mutation(graphene.ObjectType):
    create_raport = CreateRaportMutation.Field()
    add_employee = AddEmployee.Field()
    delete_employee = DeleteEmployee.Field()
    add_shift = AddShift.Field()
    delete_shift = DeleteShift.Field()


class Query(graphene.ObjectType):
    raports = graphene.List(RaportNode)
    statistics = graphene.Field(StatsNode)
    payment = graphene.Field(PaymentNode, id=graphene.Int())
    my_staff = graphene.List(EmployeeNode)

    def resolve_payments(self, **kwargs):
        now = datetime.now()
        month_ago = now - dt.timedelta(weeks=4)

        if kwargs['lat'] is not None and kwargs['lon']:
            return Payment.objects.filter(lat__iexact=kwargs['lat'], lon_iexact=kwargs['lon'], created_at__lt=now, created_at__gt=month_ago).count()
        return None

    def resolve_payment_heatmap_points(self, **kwargs):
        points_map = []
        # change model to lat, lon instead of coordinates field
        if kwargs['id'] is not None:
            locations = Employer.objects.all()
            for loc in locations:
                point = {
                    "employer_loc": loc.location,
                    "employer_name": loc.name,
                    "trans_score": self.resolve_payments(location=loc),
                    "employer_lat": loc.lat,
                    "employer_long": loc.lon
                }
                points_map.append(point)
            pdb.set_trace()
            return json.dumps(points_map)

    def resolve_my_staff(self, info, **kwargs):
        return Employee.objects.filter(employer__owner=info.context.user)

    def resolve_raports(self, info):
        return Raport.objects.filter(employer__owner=info.context.user)

    def resolve_statistics(self, info):
        months = [{'name': calendar.month_name[month], 'number': month, 'count': 0, 'amount': 0, 'days': []} for month in range(1, 13)]
        for payment in Payment.objects.filter(terminal__employer__owner=info.context.user):
            months[payment.created_at.month]['count'] += 1
            months[payment.created_at.month]['amount'] += payment.value
            months[payment.created_at.month]['days'].append(payment)
        return months

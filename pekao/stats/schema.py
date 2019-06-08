from graphene_django import DjangoObjectType
import graphene
from stats.models import User, Terminal, Payment, Raport, Employer
from django.db.models import Count
from datetime import date, timedelta


class EmployerNode(DjangoObjectType):
    class Meta:
        model = Employer


class TerminalNode(DjangoObjectType):
    class Meta:
        model = Terminal


class PaymentNode(DjangoObjectType):
    class Meta:
        model = Payment

class RaportNode(DjangoObjectType):
    class Meta:
        model = Raport


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


class Mutation(graphene.ObjectType):
    create_raport = CreateRaportMutation.Field()


class Query(graphene.ObjectType):
    raports = graphene.List(RaportNode)
    #statistics = graphene.Field(StatsType)
    payment = graphene.Field(PaymentNode, id=graphene.Int())
    customer_count = graphene.Field(CustomersCount, employer_id=graphene.Int())
    regular_customer = graphene.Field(RegularCustomer, employer_id=graphene.Int(), card_namber=graphene.String())
    new_customer = graphene.Field(RegularCustomer, employer_id=graphene.Int(), card_namber=graphene.String())
    how_many_lost_customer = graphene.Field(CustomersCount, employer_id=graphene.Int())

    def resolve_payments(self, **kwargs):
        if kwargs['id'] is not None:
            return Payment.objects.get(pk=kwargs['id'])
        return 0

    def resolve_raports(self, info):
        return Raport.objects.filter(employer__owner=info.context.user)

    def resolve_statistics(self, info):
        return None

    def resolve_customer_count(self, info, **kwargs):
        return Payment.objects.filter(terminal__in=Terminal.objects.filter(employer=kwargs['employer_id'])).annotate(Count('card_namber', distinct=True)).count()

    def resolve_regular_customer(self, info, **kwargs):
        return temp_regular_customer(44, 14, 5, **kwargs)

    def resolve_new_customer(self, info, **kwargs):
        if temp_regular_customer(44, 14, 5, **kwargs) == False:
            return temp_regular_customer(14, 0, 1, **kwargs)
        return False

    def resolve_how_many_lost_customer(self, info, **kwargs):
        before = count_customer_in_time(60, 30, **kwargs)
        now = count_customer_in_time(30, 0, **kwargs)
        return before - now


def count_customer_in_time(arg_start, arg_end, **kwargs):
    now = date.today()
    start = now - timedelta(days=arg_start)
    end = now - timedelta(days=arg_end)
    return Payment.objects.filter(
        created_at__range=[start, end],
        terminal__in=Terminal.objects.filter(employer=kwargs['employer_id'])
        ).annotate(Count('card_namber', distinct=True)).count()


def temp_regular_customer(arg_start, arg_end, value, **kwargs):
    now = date.today()
    start = now - timedelta(days=arg_start)
    end = now - timedelta(days=arg_end)
    payment = Payment.objects.filter(
        terminal__in=Terminal.objects.filter(employer=kwargs['employer_id']),
        created_at__range=[start, end],
        card_namber=kwargs['card_namber']).annotate(Count('card_namber', distinct=False)
    ).count()

    if payment > value:
        return True
    return False

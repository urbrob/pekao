from graphene_django import DjangoObjectType
import graphene
from stats.models import User, Terminal, Payment, Raport
from django.db.models.lookups import MonthTransform as Month, DayTransfrom

Item.objects.annotate(
    year=Year('date'),
    month=Month('date'),
).values('year', 'month').annotate(count=Count('pk'))

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


class Mutation(graphene.ObjectType):
    pass


class Query(graphene.ObjectType):
    raports = graphene.List(RaportNode)
    statistics = graphene.Field(StatsType)


    def resolve_raports(self, info):
        return Raport.objects.filter(employer__owner=info.context.user)

    def resolve_statistics(self, info):
        return None

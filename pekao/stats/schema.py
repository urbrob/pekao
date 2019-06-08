from graphene_django import DjangoObjectType
import graphene
from stats.models import User, Terminal, Payment, Raport, Employer


class EmployerNode(DjangoObjectType):
    class Meta:
        model = Employer


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

class StatsType(graphene.ObjectType):
    pass



class Mutation(graphene.ObjectType):
    create_raport = CreateRaportMutation.Field()


class Query(graphene.ObjectType):

    raports = graphene.List(RaportNode)
    statistics = graphene.Field(StatsType)
    payment = graphene.Field(PaymentNode, id=graphene.Int())

    def resolve_payments(self, **kwargs):
        if kwargs['id'] is not None:
            return Payment.objects.get(pk=kwargs['id'])
        return 0

    def resolve_raports(self, info):
        return Raport.objects.filter(employer__owner=info.context.user)

    def resolve_statistics(self, info):
        return None


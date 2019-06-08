from graphene_django import DjangoObjectType
import graphene
<<<<<<< HEAD
from stats.models import User, Terminal, Payment, Employer
=======
from stats.models import User, Terminal, Payment, Raport, Employer

>>>>>>> 56ad34371dfe2c5d3b50660c87b04efc25e9b52a

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


<<<<<<< HEAD
class Query(graphene.ObjectType):
    payment = graphene.Field(PaymentNode, id=graphene.Int())

    def resolve_payments(self, **kwargs):
        if kwargs['id'] is not None:
            return Payment.objects.get(pk=kwargs['id'])
        return 0


=======
class Mutation(graphene.ObjectType):
    create_raport = CreateRaportMutation.Field()


class Query(graphene.ObjectType):
    raports = graphene.List(RaportNode)
    statistics = graphene.Field(StatsType)

    def resolve_raports(self, info):
        return Raport.objects.filter(employer__owner=info.context.user)

    def resolve_statistics(self, info):
        return None
>>>>>>> 56ad34371dfe2c5d3b50660c87b04efc25e9b52a

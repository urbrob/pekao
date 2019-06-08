from graphene_django import DjangoObjectType
import graphene
from stats.models import User, Terminal, Payment

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

class Mutation(graphene.ObjectType):
    pass

class Query(graphene.ObjectType):
    pass

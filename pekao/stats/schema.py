from graphene_django import DjangoObjectType
import graphene
from stats.models import User, Terminal, Payment, Employer

class EmployerNode(DjangoObjectType):
    class Meta:
        model = Employer


class TerminalNode(DjangoObjectType):
    class Meta:
        model = Terminal


class PaymentNode(DjangoObjectType):
    class Meta:
        model = Payment



class Mutation(graphene.ObjectType):
    pass


class Query(graphene.ObjectType):
    payment = graphene.Field(PaymentNode, id=graphene.Int())

    def resolve_payments(self, **kwargs):
        if kwargs['id'] is not None:
            return Payment.objects.get(pk=kwargs['id'])
        return 0



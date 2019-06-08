import pdb

from graphene_django import DjangoObjectType
import graphene
from stats.models import User, Terminal, Payment, Raport, Employer
import json
from datetime import datetime
import datetime as dt


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


class Mutation(graphene.ObjectType):
    create_raport = CreateRaportMutation.Field()


class Query(graphene.ObjectType):
    raports = graphene.List(RaportNode)
    #statistics = graphene.Field(StatsType)
    payment = graphene.Field(PaymentNode, id=graphene.Int())

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

    def resolve_raports(self, info):
        return Raport.objects.filter(employer__owner=info.context.user)

    def resolve_statistics(self, info):
        return None

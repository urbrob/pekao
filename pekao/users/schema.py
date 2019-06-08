
from users.models import User
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
import graphene
import graphql_jwt
from graphql_jwt.shortcuts import get_token


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        only_fields = ('id', 'email', 'username')


class CreateUser(graphene.Mutation):
    token = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = User(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        return CreateUser(token=get_token(user))


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

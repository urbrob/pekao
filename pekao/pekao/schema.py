import graphene
import graphql_jwt
import users.schema

class Query(graphene.ObjectType):
    test = graphene.String()

    def resolve_test(self):
        return None


class Mutation(users.schema.Mutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

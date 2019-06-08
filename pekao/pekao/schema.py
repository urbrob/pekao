import graphene
import graphql_jwt
import users.schema
import stats.schema


class Query(stats.schema.Query):
    test = graphene.String()
    map_points = graphene.String()

    def resolve_test(self, info):
        return None


class Mutation(users.schema.Mutation, stats.schema.Mutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

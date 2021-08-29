import { GraphQLError } from "graphql"

export const formatError = (e: GraphQLError) => {
  console.log(typeof e)

  return e
}

import "module-alias/register"
import "reflect-metadata"
import { GRAPHQL_PORT } from "@config/constants"
import { context } from "@interfaces/context"
import { UserResolver } from "@resolvers/index"
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import { buildSchema } from "type-graphql"

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    globalMiddlewares: [],
    validate: false,
  })

  const app = express()

  // add redis

  app.use(
    cors({
      origin: ["http://localhost:8000", "https://studio.apollographql.com"],
      credentials: true,
    })
  )

  const apolloServer = new ApolloServer({
    schema,
    context,
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(GRAPHQL_PORT, () => {
    console.log("server running on port:", GRAPHQL_PORT)
  })
}

main().catch((e) => {
  const { details } = e
  console.log({ e, details })
})

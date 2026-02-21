import 'reflect-metadata'
import "dotenv/config";
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import express from 'express'
import { expressMiddleware } from '@as-integrations/express5'
import { buildContext } from './graphql/context';
import { UserResolver } from './resolvers/user.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { TransactionResolver } from './resolvers/transaction.resolver';


async function bootstrap() {
  const app = express()
  app.use(cors({
    origin: '*',
    credentials: true,
  }))

   const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CategoryResolver,
      TransactionResolver
    ],
    validate: false,
    emitSchemaFile: './schema.graphql',
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    })
  )

  app.listen(
    {
      port: process.env.PORT,
    },
    () => {
      console.log(`Servidor iniciado na porta ${process.env.PORT}!`)
    }
  )

}
bootstrap()
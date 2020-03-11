import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { UserResolver } from '../../entities/user/user.resolver';


/**
 * @description
 * Bind GraphQL middleware to an Express App
 * 
 * @param expressApp 
 */
export async function applyGraphqlMiddleware(
  expressApp: express.Express
): Promise<void> {
  const schema = await buildSchema({
    container: Container,
    resolvers: [
      UserResolver,
    ],
    validate: true
  });

  const graphqlServerSettings = new ApolloServer({
    schema,
    // TODO: context & auth
    // context: async ({ req, res, connection }): Pro
  });

  graphqlServerSettings.applyMiddleware({ app: expressApp });
}
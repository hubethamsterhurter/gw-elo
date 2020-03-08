import express from 'express';
import { catchMiddleware } from './middleware/catch-middleware';
import { applyGraphqlMiddleware } from './apply-graphql-middleware';

export async function applyExpressMiddleware(expressApp: express.Express) {
  expressApp.get('/', catchMiddleware(async (req, res, next) => {
    res.json({ hello: 'world' });
  }));

  await applyGraphqlMiddleware(expressApp);
}
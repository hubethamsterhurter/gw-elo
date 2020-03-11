import express from 'express';
import { catchMiddleware } from './middleware/catch.middleware';
import { applyGraphqlMiddleware } from './apply-graphql-middleware';
import { logMiddleware } from './middleware/log.middleware';
import compression from 'compression';


export async function applyExpressMiddleware(expressApp: express.Express) {
  expressApp.use(logMiddleware());
  expressApp.use(express.json());
  expressApp.use(compression());

  expressApp.get('/', catchMiddleware(async (req, res, next) => {
    res.json({ hello: 'world' });
  }));


  await applyGraphqlMiddleware(expressApp);
}
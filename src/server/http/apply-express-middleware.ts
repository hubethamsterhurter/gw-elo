import express from 'express';
import { catchMiddleware } from './middleware/catch.middleware';
import { applyGraphqlMiddleware } from './modules/apply.graphql.middleware';
import { logMiddleware } from './middleware/log.middleware';
import compression from 'compression';
import { createReadStream } from 'fs'
import { env } from '../env';
import { applyWebpackDevMiddleware } from './modules/apply.webpack.middleware';

const clientHtmlPath = `${__dirname}/../../../../dist/client/index.html`;


export async function applyExpressMiddleware(expressApp: express.Express) {
  expressApp.use(logMiddleware());
  expressApp.use(express.json());
  expressApp.use(compression());

  // TODO: webpack dev middleware (in development)
  if (!env.isProd) {
    await applyWebpackDevMiddleware(expressApp);

    // TODO: serve client?
  }

  // expressApp.get('/', (req, res, next) => {
  //   const rs = createReadStream(clientHtmlPath);
  //   rs.pipe(res).once('error', next);
  // });

  // todo: error handling middleware

  // expressApp.get('/', catchMiddleware(async (req, res, next) => {
  //   res.json({ hello: 'world' });
  // }));


  await applyGraphqlMiddleware(expressApp);
}
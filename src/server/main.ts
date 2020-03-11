import 'reflect-metadata';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { Connection, createConnection, useContainer, ConnectionOptions } from 'typeorm';
import { Container } from 'typedi';
import { env } from './env';
import { applyExpressMiddleware } from './http/apply-express-middleware';
import { connectionOptions } from './connection';

console.log('starting...');


// init DI container
useContainer(Container);

// event bus?
async function initContainer() {
  // TODO?
}

async function initConnection() {
  if (env.isDev) {
    console.log('In development: synchronising ormconfig.json');
    // create an ormconfig.json every time it runs in dev
    const res = await new Promise((res, rej) => fs.writeFile(
      path.resolve(__dirname, '../../ormconfig.json'),
      JSON.stringify(connectionOptions, null, 2),
      (err) => err ? rej(err) : res()
    ));
  } else {
    console.log('Not in development: not synchronising ormconfig.json');
  }
  console.log('Connecting to database...');
  await createConnection(connectionOptions);
}


async function boot() {
  const expressApp = express();

  console.log('Initialising connection...');
  await initConnection();

  console.log('Applying express middleware...');
  await applyExpressMiddleware(expressApp);

  console.log('Booting HTTP server...');
  expressApp.listen(env.PORT, () => { console.log(`server listening on port ${env.PORT}...`)});
}

boot();
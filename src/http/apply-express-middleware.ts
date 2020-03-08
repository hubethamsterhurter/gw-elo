import express from 'express';
import { catchMiddleware } from './middleware/catch-middleware';

export async function applyExpressMiddleware(expressApp: express.Express): Promise<express.Express> {
  expressApp.get('/', catchMiddleware(async (req, res, next) => {
    res.json({ hello: 'world' });
  }));

  return expressApp;
}
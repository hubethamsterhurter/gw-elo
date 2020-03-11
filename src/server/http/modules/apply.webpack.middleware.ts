import express from'express';
import webpackConfig from '../../../../webpack.config';
import middleware from 'webpack-dev-middleware';
import webpack from 'webpack';

const compiler = webpack(webpackConfig as any);

export async function applyWebpackDevMiddleware(
  expressApp: express.Express
): Promise<void> {
  expressApp.use(middleware(compiler));
}
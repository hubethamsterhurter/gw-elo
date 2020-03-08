import dotenv from 'dotenv';

// load env
dotenv.config();

function envBool(name: string): boolean {
  const result = process.env[name];
  if (result === undefined) throw new Error(`Unable to find env boolean ${name}`);
  return Boolean(result);
}

function envStr(name: string): string {
  const result = process.env[name];
  if (result === undefined) throw new Error(`Unable to find env string ${name}`);
  return result;
}

function envNum(name: string): number {
  const result = process.env[name];
  if (result === undefined) throw new Error(`Unable to find env number ${name}`);
  const parsed = Number(result);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) throw new Error(`Unable to parse env number ${name}`);
  return parsed;
}


export const env = {
  NODE_ENV: envStr('NODE_ENV'),
  isDev: envStr('NODE_ENV').toLowerCase() === 'development',

  PORT: envNum('PORT'),
  DB_PASSWORD: envStr('DB_PASSWORD'),
  DB_USER: envStr('DB_USER'),
  DB_HOST: envStr('DB_HOST'),
  DB_PORT: envNum('DB_PORT'),
  DB_DATABASE: envStr('DB_DATABASE'),

  // from start script
  ROOT_DIR: envStr('ROOT_DIR'),
  EXT_NAME: envStr('EXT_NAME'),
} as const;


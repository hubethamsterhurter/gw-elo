import { ConnectionOptions } from "typeorm";
import { env } from "./env";

const entities = [`${env.ROOT_DIR}/entities/**/*.entity.${env.EXT_NAME}`];
const migrations = [`${env.ROOT_DIR}/migrations/*-migration.${env.EXT_NAME}`];
const entitiesDir = `${env.ROOT_DIR}/entities`;
const migrationsDir = `${env.ROOT_DIR}/migrations`;

console.log(`[main.ts] entities: ${entities.join(', ')}`);
console.log(`[main.ts] entitiesDir: ${entitiesDir}`);

// TODO: single source of truth for DB config - make app & script config the same
export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DATABASE,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  entities,
  // doh
  migrations,
  synchronize: false,
  logging: false,
  cli: {
    entitiesDir,
    migrationsDir,
  }
};
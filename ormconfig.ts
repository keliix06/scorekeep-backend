import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from './src/utils/env/env.service';

export function config(env?: Env): TypeOrmModuleOptions {
  console.log(
    `[TypeORM Config] Config mode detected: ${
      env
        ? 'Nest Application'
        : 'CLI? (no env service injected). You will need to ensure env variables are injected yourself!'
    }`,
  );

  if (!env) {
    env = new Env(); // Env does not depend on the Nest DI container
  }

  // Check if we've injected the env service
  const envVars = {
    host: env.DATABASE_HOST || 'localhost',
    port: env.DATABASE_PORT || 5432,
    username: env.DATABASE_USER || '',
    password: env.DATABASE_PASS || '',
    database: env.DATABASE_DATABASE || '',
    synchronize: env.DATABASE_DEBUG_SYNC || false,
  };

  return {
    type: 'postgres',
    ...envVars,
    entities: [__dirname + '/src/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/src/migrations/*.{js,ts}'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cli: { migrationsDir: __dirname + './migrations' },
  };
}

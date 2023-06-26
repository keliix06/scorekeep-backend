import { Injectable, Logger } from '@nestjs/common';

const safeEnv = (envVarName: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
  const ret = process.env[envVarName];
  if (ret === undefined) {
    throw Error(
      `tried to access env variable that is undefined: ${envVarName}`,
    );
  } else {
    return ret;
  }
};

@Injectable()
export class Env {
  private logger: Logger;
  constructor() {
    console.log('Constructed Env service');
    this.logger = new Logger(Env.name);
  }

  get DATABASE_HOST(): string {
    return safeEnv('DATABASE_HOST');
  }

  get DATABASE_USER(): string {
    return safeEnv('DATABASE_USER');
  }

  get DATABASE_PORT(): number {
    return Number(safeEnv('DATABASE_PORT'));
  }

  get DATABASE_PASS(): string {
    return safeEnv('DATABASE_PASS');
  }

  get DATABASE_DATABASE(): string {
    return safeEnv('DATABASE_DATABASE');
  }

  get DATABASE_DEBUG_SYNC(): boolean {
    return safeEnv('DATABASE_DEBUG_SYNC') === 'true';
  }

  get JWT_PRIVATE_KEY(): string {
    return safeEnv('JWT_PRIVATE_KEY');
  }

  get ENVIRONMENT(): string {
    return process.env.ENVIRONMENT || 'dev';
  }
}

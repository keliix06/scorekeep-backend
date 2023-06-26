import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { Env } from './utils/env/env.service';
import { config } from '../ormconfig';

@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forRootAsync({
      imports: [UtilsModule],
      useFactory: async (env: Env) => ({
        ...config(env),
      }),
      inject: [Env],
    }),
    UsersModule,
  ],
})
export class AppModule {}

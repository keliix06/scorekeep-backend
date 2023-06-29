import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { Env } from './utils/env/env.service';
import { config } from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';

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
    AuthModule,
    TeamsModule,
    PlayersModule,
  ],
})
export class AppModule {}

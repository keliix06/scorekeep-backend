import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TeamsService } from '../teams/teams.service';
import { Team } from '../teams/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forFeature([Team]),
  ],
  providers: [PlayersService, TeamsService],
  controllers: [PlayersController],
  exports: [PlayersService],
})
export class PlayersModule {}

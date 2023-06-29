import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Team } from '../teams/team.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async create(createTeamDto: CreatePlayerDto, team: Team): Promise<Player> {
    const player = new Player();
    player.name = createTeamDto.name;
    player.team = team;
    player.number = createTeamDto.number;
    console.log('PLAYER ', player);
    return this.playersRepository.save(player);
  }

  async update(updatePlayerDto: UpdatePlayerDto): Promise<Player | null> {
    const player = await this.playersRepository.findOneBy({
      id: updatePlayerDto.id,
    });

    if (player) {
      return this.playersRepository.save(updatePlayerDto);
    }

    return null;
  }

  async findOne(id: string): Promise<Player | null> {
    return await this.playersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.playersRepository.delete(id);
  }
}

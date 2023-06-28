import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = new Team();
    team.name = createTeamDto.name;
    team.user_id = createTeamDto.user_id;
    return this.teamsRepository.save(team);
  }

  async update(
    updateTeamDto: UpdateTeamDto,
    userId: string,
  ): Promise<Team | null> {
    const team = await this.teamsRepository.findOneBy({ id: updateTeamDto.id });

    if (team?.user_id !== userId) {
      throw new UnauthorizedException();
    }

    if (team) {
      team.name = updateTeamDto.name;
      return this.teamsRepository.save(team);
    }

    return null;
  }

  async findAll(user_id: string): Promise<Team[]> {
    return this.teamsRepository.findBy({ user_id: user_id });
  }

  async findOne(id: string): Promise<Team | null> {
    return await this.teamsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.teamsRepository.delete(id);
  }
}

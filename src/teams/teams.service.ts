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
    team.userId = createTeamDto.userId;
    return this.teamsRepository.save(team);
  }

  async update(
    updateTeamDto: UpdateTeamDto,
    userId: string,
  ): Promise<Team | null> {
    const team = await this.teamsRepository.findOneBy({ id: updateTeamDto.id });

    if (team?.userId !== userId) {
      throw new UnauthorizedException();
    }

    if (team) {
      team.name = updateTeamDto.name;
      return this.teamsRepository.save(team);
    }

    return null;
  }

  async findAll(userId: string): Promise<Team[]> {
    return this.teamsRepository.find({
      where: { userId: userId },
      relations: ['players'],
    });
  }

  async findAllPlayers(id: string): Promise<Team | null> {
    return this.teamsRepository.findOne({
      where: { id: id },
      // relations: ['players'],
    });
  }

  async findOne(id: string): Promise<Team | null> {
    return await this.teamsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.teamsRepository.delete(id);
  }
}

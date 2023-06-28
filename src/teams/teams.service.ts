import { Injectable } from '@nestjs/common';
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
    // TODO Auth Guard to get current user ID instead of it being in the request
    team.user_id = createTeamDto.user_id;
    return this.teamsRepository.save(team);
  }

  async update(updateTeamDto: UpdateTeamDto): Promise<Team | null> {
    const team = await this.teamsRepository.findOneBy({ id: updateTeamDto.id });
    // TODO verify that team is owned by current user

    if (team) {
      team.name = updateTeamDto.name;
      return this.teamsRepository.save(team);
    }

    return null;
  }

  async findAll(): Promise<Team[]> {
    // TODO only owned by current user
    return this.teamsRepository.find();
  }

  async findOne(id: string): Promise<Team | null> {
    // TODO only owned by current user
    return await this.teamsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    // TODO only owned by current user
    await this.teamsRepository.delete(id);
  }
}

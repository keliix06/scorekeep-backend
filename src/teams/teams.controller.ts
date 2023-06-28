import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({
    description: 'The created team',
    type: Team,
    isArray: false,
  })
  @ApiBearerAuth()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get a list of all teams owned by current user' })
  @ApiResponse({
    description: 'All teams this user has created',
    type: Team,
    isArray: true,
  })
  @ApiBearerAuth()
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get a single team owned by current user' })
  @ApiResponse({
    description: 'Single team this user has created',
    type: Team,
    isArray: false,
  })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Team | null> {
    return this.teamsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team owned by current user' })
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(id);
  }
}

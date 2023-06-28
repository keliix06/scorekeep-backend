import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UnauthorizedException,
  Put,
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
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { UpdateTeamDto } from './dto/update-team.dto';

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
  create(
    @GetUser() user: User,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<Team> {
    createTeamDto.user_id = user.id;
    return this.teamsService.create(createTeamDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiOperation({ summary: 'Update team' })
  @ApiResponse({
    description: 'The updated team',
    type: Team,
    isArray: false,
  })
  @ApiBearerAuth()
  update(
    @GetUser() user: User,
    @Body() updateTeamDto: UpdateTeamDto,
    @Param('id') id: string,
  ): Promise<Team | null> {
    updateTeamDto.id = id;
    return this.teamsService.update(updateTeamDto, user.id);
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
  findAll(@GetUser() user: User): Promise<Team[]> {
    return this.teamsService.findAll(user.id);
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
  async findOne(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Team | null> {
    const team = await this.teamsService.findOne(id);

    if (user.id !== team?.user_id) {
      throw new UnauthorizedException();
    }

    return this.teamsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team owned by current user' })
  @ApiBearerAuth()
  async remove(@GetUser() user: User, @Param('id') id: string): Promise<void> {
    const team = await this.teamsService.findOne(id);

    if (user.id !== team?.user_id) {
      throw new UnauthorizedException();
    }

    return this.teamsService.remove(id);
  }
}

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
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayersService } from './players.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { TeamsService } from '../teams/teams.service';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly teamsService: TeamsService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create player' })
  @ApiResponse({
    description: 'The created player',
    type: Player,
    isArray: false,
  })
  @ApiBearerAuth()
  async create(
    @GetUser() user: User,
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const team = await this.teamsService.findOne(createPlayerDto.teamId);

    if (user.id !== team?.userId) {
      throw new UnauthorizedException();
    }

    return this.playersService.create(createPlayerDto, team);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  @ApiOperation({ summary: 'Update player' })
  @ApiResponse({
    description: 'The updated player',
    type: Player,
    isArray: false,
  })
  @ApiBearerAuth()
  async update(
    @GetUser() user: User,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player | null> {
    const player = await this.playersService.findOne(updatePlayerDto.id);

    if (user.id !== player?.team.userId) {
      throw new UnauthorizedException();
    }

    return this.playersService.update(updatePlayerDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get a single player' })
  @ApiResponse({
    description: 'Get a single player',
    type: Player,
    isArray: false,
  })
  @ApiBearerAuth()
  async findOne(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Player> {
    const player = await this.playersService.findOne(id);

    if (user.id !== player?.team.userId) {
      throw new UnauthorizedException();
    }

    return player;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team owned by current user' })
  @ApiBearerAuth()
  async remove(@GetUser() user: User, @Param('id') id: string): Promise<void> {
    const player = await this.playersService.findOne(id);

    if (user.id !== player?.team.userId) {
      throw new UnauthorizedException();
    }

    return this.playersService.remove(id);
  }
}

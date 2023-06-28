import {
  Body,
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/public.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

// TODO: need to handle lost/forgotten password at some point
@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    description: 'The created user',
    type: User,
    isArray: false,
  })
  @Public()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update userx' })
  @ApiResponse({
    description: 'The updated user',
    type: User,
    isArray: false,
  })
  @ApiBearerAuth()
  async update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const ret = await this.usersService.update(updateUserDto, user.id);

    // Interceptor was not removing password automatically. Hate how hacky this is
    if (ret) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete ret?.password;
    }

    return ret;
  }
}

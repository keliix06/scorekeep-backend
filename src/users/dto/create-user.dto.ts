import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  firstname: string;
  @IsString()
  @ApiProperty()
  lastname: string;
  @IsString()
  @ApiProperty()
  username: string;
  @IsString()
  @ApiProperty()
  password: string;
  @IsString()
  @ApiProperty()
  email: string;
}

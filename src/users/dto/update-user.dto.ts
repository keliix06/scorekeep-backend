import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  readonly id: string;
  @IsString()
  @ApiProperty()
  firstname: string;
  @IsString()
  @ApiProperty()
  lastname: string;
  @IsString()
  @ApiProperty()
  password: string;
  @IsString()
  @ApiProperty()
  email: string;
}

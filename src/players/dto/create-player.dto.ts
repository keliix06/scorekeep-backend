import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsNumber()
  @ApiProperty()
  number: number;
  @IsString()
  @ApiProperty()
  teamId: string;
}

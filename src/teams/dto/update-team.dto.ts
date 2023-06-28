import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto {
  @IsString()
  @ApiProperty()
  id: string;
  @IsString()
  @ApiProperty()
  name: string;
}

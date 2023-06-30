import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerDto {
  @IsString()
  @ApiProperty()
  readonly id: string;
  @IsString()
  @ApiProperty()
  readonly teamId: string;
  @IsString()
  @ApiProperty()
  name: string;
  @IsNumber()
  @ApiProperty()
  number: number;
}

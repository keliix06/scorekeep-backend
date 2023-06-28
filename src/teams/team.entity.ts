import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'ab007508-4ade-45b4-ad34-48529a363c51',
    description: 'ID of user that owns this team',
  })
  @Column({ type: 'varchar', length: 300 })
  user_id: string;

  @ApiProperty({
    example: 'MN Wild',
    description: 'Name of the team',
  })
  @Column({ type: 'varchar', length: 300 })
  name: string;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ObjectType,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../teams/team.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @ApiProperty({
    example: 'ab007508-4ade-45b4-ad34-48529a363c51',
    description: 'ID of team this player belongs to',
  })
  @Column({ nullable: false })
  teamId: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the player',
  })
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @ApiProperty({
    example: '99',
    description: 'Number of the player',
  })
  @Column()
  number: number;

  @ManyToOne(() => Team, (team: Team) => team.players)
  team: Team;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Player } from '../players/player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'ab007508-4ade-45b4-ad34-48529a363c51',
    description: 'ID of user that owns this team',
  })
  @Column()
  userId: string;

  @ApiProperty({
    example: 'MN Wild',
    description: 'Name of the team',
  })
  @Column()
  name: string;

  @OneToMany(() => Player, (player) => player.team, {
    cascade: true,
  })
  players: Player[];
}

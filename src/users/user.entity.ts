import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    type: 'string',
    required: true,
  })
  @Column({ type: 'varchar', length: 300 })
  firstname: string;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  @Column({ type: 'varchar', length: 300 })
  lastname: string;

  @Column({ type: 'varchar', length: 300 })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;
}

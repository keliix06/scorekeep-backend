import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @Column({ type: 'varchar', length: 300 })
  firstname: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @Column({ type: 'varchar', length: 300 })
  lastname: string;

  @ApiProperty({
    example: 'cooluser',
    description: 'Username for logging in',
  })
  @Column({ type: 'varchar', length: 300, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  @Exclude()
  password: string;

  @ApiProperty({
    example: 'john@doe.com',
    description: "User's email address",
  })
  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;
}

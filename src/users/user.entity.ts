import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  firstname: string;

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

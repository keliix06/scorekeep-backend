import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = new User();
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.username = createUserDto.username;
    user.password = hashPassword;
    user.email = createUserDto.email;
    return this.usersRepository.save(user);
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username: username });
  }
}

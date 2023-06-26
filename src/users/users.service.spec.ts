import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

const userArray = [
  {
    firstname: 'firstName #1',
    lastname: 'lastName #1',
    username: 'fancyuser',
    password: 'password',
    email: 'fancyuser@site.com',
  },
  {
    firstname: 'firstName #2',
    lastname: 'lastName #2',
    username: 'fancyuser2',
    password: 'password',
    email: 'fancyuser2@site.com',
  },
];

const oneUser = {
  firstname: 'firstName #1',
  lastname: 'lastName #1',
  username: 'fancyuser',
  password: 'password',
  email: 'fancyuser@site.com',
};

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstname: 'firstName #1',
        lastname: 'lastName #1',
        username: 'fancyuser',
        password: 'password',
        email: 'fancyuser@site.com',
      };

      expect(
        service.create({
          firstname: 'firstName #1',
          lastname: 'lastName #1',
          username: 'fancyuser',
          password: 'password',
          email: 'fancyuser@site.com',
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('1')).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ id: '1' });
    });
  });

  describe('findByUsername()', () => {
    it('should get a single user by username', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findByUsername('fancyuser')).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ username: 'fancyuser' });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});

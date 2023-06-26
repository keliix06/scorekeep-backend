import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const createUserDto: CreateUserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  username: 'fancyuser',
  password: 'password',
  email: 'fancyuser@site.com',
};

const uuid = '76b0ef33-bbac-4b15-99e1-75e7cb95aba5';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: uuid, ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                username: 'fancyuser',
                password: 'password',
                email: 'fancyuser@site.com',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
                username: 'fancyuser2',
                password: 'password',
                email: 'fancyuser2@site.com',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                username: 'fancyuser',
                password: 'password',
                email: 'fancyuser@site.com',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      expect(usersController.create(createUserDto)).resolves.toMatchObject({
        id: uuid,
        ...createUserDto,
      });
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne(uuid)).resolves.toMatchObject({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        username: 'fancyuser',
        password: 'password',
        email: 'fancyuser@site.com',
        id: uuid,
      });
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove(uuid);
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});

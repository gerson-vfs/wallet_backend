import { Test, TestingModule } from '@nestjs/testing';
import { MemoryUserRepository } from './repository/MemoryUserRepository';
import { UserRepository } from './repository/UserRepository';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserRepository,
          useClass: MemoryUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = controller.create(body);

    expect(user.id).toBe(1);
    expect(user.name).toBe(body.name);
    expect(user.email).toBe(body.email);
    expect(user.password).toBe(body.password);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBe(user.updatedAt);
  });

  it('should return a user', () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = controller.create(body);

    expect(controller.findOne('1')).toEqual(user);
  });

  it('should return all users', () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = controller.create(body);

    expect(controller.findAll()).toEqual([user]);
  });

  it('should update a user', () => {
    const body1 = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const body2 = {
      name: 'John Doe 2',
      password: 'abc@123 1',
    };

    controller.create(body1);
    const user = controller.update('1', body2);

    expect(user.id).toBe(1);
    expect(user.name).toBe(body2.name);
    expect(user.password).toBe(body2.password);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).not.toBe(user.updatedAt);
  });

  it('should delete a user', () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    controller.create(body);

    expect(controller.remove('1')).toBeUndefined();
  });
});

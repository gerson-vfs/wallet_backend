import { Test, TestingModule } from '@nestjs/testing';
import { MemoryUserRepository } from '../repository/UserRepository/MemoryUserRepository';
import { UserRepository } from '../repository/UserRepository/UserRepository';
import { CreateAccountUseCase } from './usecases/CreateAccountUseCase';
import { FindAllAccountsUseCase } from './usecases/FindAllAccountsUseCase';
import { FindAccountUseCase } from './usecases/FindAccountUseCase';
import { RemoveAccountUseCase } from './usecases/RemoveAccountUseCase';
import { UpdateAccountUseCase } from './usecases/UpdateAccountUseCase';
import { AccountsController } from './accounts.controller';

describe('AccountsController', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: UserRepository,
          useClass: MemoryUserRepository,
        },
        CreateAccountUseCase,
        FindAllAccountsUseCase,
        FindAccountUseCase,
        RemoveAccountUseCase,
        UpdateAccountUseCase,
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = await controller.create(body);

    expect(user.id).toBe(1);
    expect(user.name).toBe(body.name);
    expect(user.email).toBe(body.email);
    expect(user.password).toBe(body.password);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBe(user.updatedAt);
  });

  it('should return a user', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = await controller.create(body);
    const foundUser = await controller.findOne('1');

    expect(foundUser).toEqual(user);
  });

  it('should return all users', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = await controller.create(body);
    const users = await controller.findAll();

    expect(users).toEqual([user]);
  });

  it('should update a user', async () => {
    const body1 = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const body2 = {
      name: 'John Doe 2',
      password: 'abc@123 1',
    };

    await controller.create(body1);
    const user = await controller.update('1', body2);

    expect(user.id).toBe(1);
    expect(user.name).toBe(body2.name);
    expect(user.password).toBe(body2.password);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).not.toBe(user.updatedAt);
  });

  it('should delete a user', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = await controller.create(body);
    const deletedUser = await controller.remove('1');

    expect(deletedUser).toEqual(user);
  });

  it('should return undefined if user not found', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const updatedUser = await controller.update('1', body);
    const deletedUser = await controller.remove('1');
    const foundUser = await controller.findOne('1');

    expect(updatedUser).toBeNull();
    expect(deletedUser).toBeNull();
    expect(foundUser).toBeNull();
  });
});

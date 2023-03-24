import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../users/entities/user.entity';
import { MemoryUserRepository } from './MemoryUserRepository';
import { UserRepository } from './UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useClass: MemoryUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should increment the id', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user1 = await userRepository.create(body);
    const user2 = await userRepository.create(body);

    expect(user1.id).toBe(1);
    expect(user2.id).toBe(2);

    await userRepository.remove(1);
    await userRepository.remove(2);

    const user3 = await userRepository.create(body);
    const user4 = await userRepository.create(body);

    expect(user3.id).toBe(3);
    expect(user4.id).toBe(4);
  });

  it('should create a user', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user = await userRepository.create(body);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(1);
    expect(user.name).toBe(body.name);
    expect(user.email).toBe(body.email);
    expect(user.password).toBe(body.password);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBe(user.updatedAt);
  });

  it('should return an array of users', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    await userRepository.create(body);

    const users = await userRepository.findAll();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(1);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[0].id).toBe(1);
    expect(users[0].name).toBe(body.name);
    expect(users[0].email).toBe(body.email);
    expect(users[0].password).toBe(body.password);
    expect(users[0].createdAt).toBeDefined();
    expect(users[0].updatedAt).toBeDefined();
    expect(users[0].createdAt).toBe(users[0].updatedAt);
  });

  it('should return a user', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    await userRepository.create(body);

    const user = await userRepository.findOne(1);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(1);
    expect(user.name).toBe(body.name);
    expect(user.email).toBe(body.email);
    expect(user.password).toBe(body.password);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBe(user.updatedAt);
  });

  it('should return undefined if user not found', async () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const updatedUser = await userRepository.update(1, body);
    const removedUser = await userRepository.remove(1);
    const foundUser = await userRepository.findOne(1);

    expect(updatedUser).toBeNull();
    expect(removedUser).toBeNull();
    expect(foundUser).toBeNull();
  });
});

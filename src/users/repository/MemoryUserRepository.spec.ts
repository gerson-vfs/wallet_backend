import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
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

  it('should increment the id', () => {
    const body = {
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    };

    const user1 = userRepository.create(body);
    const user2 = userRepository.create(body);

    expect(user1.id).toBe(1);
    expect(user2.id).toBe(2);

    userRepository.remove(1);
    userRepository.remove(2);

    const user3 = userRepository.create(body);
    const user4 = userRepository.create(body);

    expect(user3.id).toBe(3);
    expect(user4.id).toBe(4);
  });

  it('should create a user', () => {
    const user = userRepository.create({
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('email@domain');
    expect(user.password).toBe('abc@123');

    userRepository.remove(1);
  });

  it('should return an array of users', () => {
    userRepository.create({
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    });

    const users = userRepository.findAll();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(1);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[0].id).toBe(1);
    expect(users[0].name).toBe('John Doe');
    expect(users[0].email).toBe('email@domain');
    expect(users[0].password).toBe('abc@123');
  });

  it('should return a user', () => {
    userRepository.create({
      name: 'John Doe',
      email: 'email@domain',
      password: 'abc@123',
    });

    const user = userRepository.findOne(1);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('email@domain');
    expect(user.password).toBe('abc@123');
  });
});
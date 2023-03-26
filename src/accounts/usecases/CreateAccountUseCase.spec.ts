import { Test, TestingModule } from '@nestjs/testing';
import { MemoryUserRepository } from '../../repository/UserRepository/MemoryUserRepository';
import { UserRepository } from '../../repository/UserRepository/UserRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';

describe('CreateAccountUseCase', () => {
  let createAccountUseCase: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useClass: MemoryUserRepository,
        },
        CreateAccountUseCase,
      ],
    }).compile();

    createAccountUseCase =
      module.get<CreateAccountUseCase>(CreateAccountUseCase);
  });

  it('should be defined', () => {
    expect(createAccountUseCase).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../../../services/AccountService/AccountService';
import { AxiosAccountService } from '../../../services/AccountService/AxiosAccountService';
import { AxiosBalanceService } from '../../../services/BalanceService/AxiosBalanceService';
import { BalanceService } from '../../../services/BalanceService/BalanceService';
import { CreateTransferUseCase } from './CreateTransferUseCase';

describe('CreateTransferUseCase', () => {
  let createTransferUseCase: CreateTransferUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AccountService,
          useClass: AxiosAccountService,
        },
        {
          provide: BalanceService,
          useClass: AxiosBalanceService,
        },
        CreateTransferUseCase,
      ],
    }).compile();

    createTransferUseCase = module.get<CreateTransferUseCase>(
      CreateTransferUseCase,
    );
  });

  it('should be defined', () => {
    expect(createTransferUseCase).toBeDefined();
  });
});

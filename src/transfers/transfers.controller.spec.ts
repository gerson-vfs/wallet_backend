import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../services/AccountService/AccountService';
import { AxiosAccountService } from '../services/AccountService/AxiosAccountService';
import { BalanceService } from '../services/BalanceService/BalanceService';
import { AxiosBalanceService } from '../services/BalanceService/AxiosBalanceService';
import { CreateTransferUseCase } from './domain/usecases/CreateTransferUseCase';
import { TransfersController } from './transfers.controller';

describe('TransfersController', () => {
  let controller: TransfersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransfersController],
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

    controller = module.get<TransfersController>(TransfersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

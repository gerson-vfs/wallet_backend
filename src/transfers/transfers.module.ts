import { Module } from '@nestjs/common';
import { AccountService } from '../services/AccountService/AccountService';
import { AxiosAccountService } from '../services/AccountService/AxiosAccountService';
import { AxiosBalanceService } from '../services/BalanceService/AxiosBalanceService';
import { BalanceService } from '../services/BalanceService/BalanceService';
import { CreateTransferUseCase } from './domain/usecases/CreateTransferUseCase';
import { TransfersController } from './transfers.controller';

@Module({
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
})
export class TransfersModule {}

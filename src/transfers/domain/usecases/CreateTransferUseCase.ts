import { Injectable } from '@nestjs/common';
import { AccountNotFoundError } from '../../../errors/AccountNotFoundError';
import { InsufficientFundsError } from '../../../errors/InsufficientFundsError';
import { AccountService } from '../../../services/AccountService/AccountService';
import { BalanceService } from '../../../services/BalanceService/BalanceService';
import {
  TransactionReason,
  TransactionStatus,
  TransactionType,
} from '../../../transactions/domain/entities/transaction.entity';
import { CreateTransferDto } from '../dto/create-transfer.dto';

@Injectable()
export class CreateTransferUseCase {
  constructor(
    private readonly accountService: AccountService,
    private readonly balanceService: BalanceService,
  ) {}

  async execute(createTransferDto: CreateTransferDto) {
    const origin = await this.accountService.getAccountById(
      createTransferDto.origin.id,
    );

    if (!origin) {
      throw new AccountNotFoundError();
    }

    const destination = await this.accountService.getAccountById(
      createTransferDto.destination.id,
    );

    if (!destination) {
      throw new AccountNotFoundError();
    }

    const balance = await this.balanceService.getBalance(origin.id);
    const amount = createTransferDto.amount;

    if (balance < amount) {
      throw new InsufficientFundsError();
    }

    const response = await Promise.all([
      this.balanceService.createTransaction({
        accountId: origin.id,
        amount,
        type: TransactionType.DEBIT,
        status: TransactionStatus.COMPLETED,
        reason: TransactionReason.TRANSFER,
      }),
      this.balanceService.createTransaction({
        accountId: destination.id,
        amount,
        type: TransactionType.CREDIT,
        status: TransactionStatus.COMPLETED,
        reason: TransactionReason.TRANSFER,
      }),
    ]);

    return response;
  }
}

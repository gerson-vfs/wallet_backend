import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { BalanceService } from './BalanceService';

@Injectable()
export class AxiosBalanceService implements BalanceService {
  getBalance(accountId: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
  createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
}

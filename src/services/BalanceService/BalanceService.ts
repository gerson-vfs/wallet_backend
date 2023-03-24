import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';

export abstract class BalanceService {
  abstract getBalance(accountId: number): Promise<number>;
  abstract createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction>;
}

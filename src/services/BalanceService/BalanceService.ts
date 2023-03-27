import { CreateTransactionDto } from '../../transactions/domain/dto/create-transaction.dto';
import { Transaction } from '../../transactions/domain/entities/transaction.entity';

export abstract class BalanceService {
  abstract getBalance(accountId: number): Promise<number>;
  abstract createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction>;
}

import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../transactions/dto/update-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(createTransactionDto: CreateTransactionDto): Transaction;
  abstract findAll(): Transaction[];
  abstract findOne(id: number): Transaction | null;
  abstract update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Transaction | null;
  abstract remove(id: number): Transaction | null;
}

import { CreateTransactionDto } from '../../transactions/domain/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../transactions/domain/dto/update-transaction.dto';
import { Transaction } from '../../transactions/domain/entities/transaction.entity';

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

import {
  TransactionReason,
  TransactionStatus,
  TransactionType,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  reason: TransactionReason;
}

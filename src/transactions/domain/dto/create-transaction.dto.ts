import {
  TransactionReason,
  TransactionStatus,
  TransactionType,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  accountId: number;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  reason: TransactionReason;
}

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum TransactionReason {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
  BUY = 'buy',
  PAYMENT = 'payment',
}

export class Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  reason: TransactionReason;
  created: Date;
  updated: Date;
}

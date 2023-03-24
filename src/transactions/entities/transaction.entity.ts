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
  createdAt: Date;
  updatedAt: Date;

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.amount = transaction.amount;
    this.type = transaction.type;
    this.status = transaction.status;
    this.reason = transaction.reason;
    this.createdAt = transaction.createdAt;
    this.updatedAt = transaction.updatedAt;
  }
}

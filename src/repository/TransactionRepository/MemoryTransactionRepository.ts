import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../transactions/dto/update-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { TransactionRepository } from './TransactionRepository';

@Injectable()
export class MemoryTransactionRepository implements TransactionRepository {
  protected id = 1;
  protected transactions: Transaction[] = [];

  create(createTransactionDto: CreateTransactionDto): Transaction {
    const now = new Date();

    const transaction = new Transaction({
      id: this.id,
      accountId: createTransactionDto.accountId,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      status: createTransactionDto.status,
      reason: createTransactionDto.reason,
      createdAt: now,
      updatedAt: now,
    });

    this.transactions.push(transaction);
    this.id++;

    return transaction;
  }

  findAll(): Transaction[] {
    return this.transactions;
  }

  findOne(id: number): Transaction | null {
    const idx = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    );

    if (idx === -1) {
      return null;
    }

    return this.transactions[idx];
  }

  update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Transaction | null {
    const idx = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    );

    if (idx === -1) {
      return null;
    }

    const transaction = new Transaction({
      id: this.transactions[idx].id,
      accountId: updateTransactionDto.accountId,
      amount: updateTransactionDto.amount,
      type: updateTransactionDto.type,
      status: updateTransactionDto.status,
      reason: updateTransactionDto.reason,
      createdAt: this.transactions[idx].createdAt,
      updatedAt: new Date(),
    });

    this.transactions[idx] = transaction;

    return transaction;
  }
  remove(id: number): Transaction | null {
    const idx = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    );

    if (idx === -1) {
      return null;
    }

    const transaction = this.transactions[idx];
    this.transactions.splice(idx, 1);
    return transaction;
  }
}

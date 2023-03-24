import { Module } from '@nestjs/common';
import { MemoryTransactionRepository } from '../repository/TransactionRepository/MemoryTransactionRepository';
import { TransactionRepository } from '../repository/TransactionRepository/TransactionRepository';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    {
      provide: TransactionRepository,
      useClass: MemoryTransactionRepository,
    },
  ],
})
export class TransactionsModule {}

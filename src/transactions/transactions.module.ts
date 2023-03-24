import { Module } from '@nestjs/common';
import { MemoryTransactionRepository } from 'src/repository/TransactionRepository/MemoryTransactionRepository';
import { TransactionRepository } from 'src/repository/TransactionRepository/TransactionRepository';
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

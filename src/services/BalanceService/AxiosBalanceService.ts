import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { BalanceService } from './BalanceService';
import axios from 'axios';

@Injectable()
export class AxiosBalanceService implements BalanceService {
  private readonly axios = axios.create({
    baseURL: 'http://localhost:4000',
  });

  async getBalance(accountId: number): Promise<number> {
    const { data } = await this.axios.get(`/balance/${accountId}`);
    return data.balance;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { data } = await this.axios.post(
      '/transactions',
      createTransactionDto,
    );
    return new Transaction(data);
  }
}

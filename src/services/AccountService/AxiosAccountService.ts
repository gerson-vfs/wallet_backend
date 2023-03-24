import { Injectable } from '@nestjs/common';
import { Account } from '../../accounts/entities/user.entity';
import { AccountService } from './AccountService';
import axios from 'axios';

@Injectable()
export class AxiosAccountService implements AccountService {
  private readonly axios = axios.create({
    baseURL: 'http://localhost:4000',
  });

  async getAccountById(id: number): Promise<Account> {
    const { data } = await this.axios.get(`/accounts/${id}`);
    return new Account(data);
  }
}

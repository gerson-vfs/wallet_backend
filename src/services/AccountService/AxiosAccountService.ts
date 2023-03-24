import { Injectable } from '@nestjs/common';
import { Account } from '../../users/entities/user.entity';
import { AccountService } from './AccountService';

@Injectable()
export class AxiosAccountService implements AccountService {
  getAccountById(id: number): Promise<Account> {
    throw new Error('Method not implemented.');
  }
  getAccountByEmail(email: string): Promise<Account> {
    throw new Error('Method not implemented.');
  }
}

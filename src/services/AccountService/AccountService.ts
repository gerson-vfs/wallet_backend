import { Account } from '../../users/entities/user.entity';

export abstract class AccountService {
  abstract getAccountById(id: number): Promise<Account>;
  abstract getAccountByEmail(email: string): Promise<Account>;
}

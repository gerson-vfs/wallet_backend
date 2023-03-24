import { Account } from '../../accounts/entities/user.entity';

export abstract class AccountService {
  abstract getAccountById(id: number): Promise<Account>;
}

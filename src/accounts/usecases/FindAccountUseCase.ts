import { Injectable } from '@nestjs/common';
import { Account } from '../entities/user.entity';
import { UserRepository } from '../../repository/UserRepository/UserRepository';
import { AccountNotFoundError } from 'src/errors/AccountNotFoundError';

@Injectable()
export class FindAccountUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<Account | null> {
    const user = await this.userRepository.findOne(id);

    if (user) {
      return user;
    }

    throw new AccountNotFoundError();
  }
}

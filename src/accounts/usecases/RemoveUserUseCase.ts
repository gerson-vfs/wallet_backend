import { Injectable } from '@nestjs/common';
import { Account } from '../entities/user.entity';
import { UserRepository } from '../../repository/UserRepository/UserRepository';

@Injectable()
export class RemoveUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<Account | null> {
    return await this.userRepository.remove(id);
  }
}

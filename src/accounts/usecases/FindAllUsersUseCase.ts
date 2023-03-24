import { Injectable } from '@nestjs/common';
import { Account } from '../entities/user.entity';
import { UserRepository } from '../../repository/UserRepository/UserRepository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Account[]> {
    return await this.userRepository.findAll();
  }
}

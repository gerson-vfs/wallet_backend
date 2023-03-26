import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Account } from '../entities/user.entity';
import { UserRepository } from '../../repository/UserRepository/UserRepository';

@Injectable()
export class UpdateAccountUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<Account> {
    return await this.userRepository.update(id, updateUserDto);
  }
}

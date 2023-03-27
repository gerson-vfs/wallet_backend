import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Account } from '../entities/user.entity';
import { UserRepository } from '../../repository/UserRepository/UserRepository';
import { AccountAlreadyExistsError } from '../../errors/AccountAlreadyExistsError';

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<Account> {
    const user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new AccountAlreadyExistsError();
    }

    return await this.userRepository.create(createUserDto);
  }
}

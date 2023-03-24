import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Account } from '../entities/user.entity';
import { UserRepository } from '../../repository/UserRepository/UserRepository';
import { UserAlreadyExistsError } from 'src/errors/UserElreadyExistsError';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<Account> {
    const user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new UserAlreadyExistsError();
    }

    return await this.userRepository.create(createUserDto);
  }
}

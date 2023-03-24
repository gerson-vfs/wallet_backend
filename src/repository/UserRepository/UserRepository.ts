import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { Account } from '../../users/entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<Account>;
  abstract findAll(): Promise<Account[]>;
  abstract findOne(id: number): Promise<Account | null>;
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Account | null>;
  abstract remove(id: number): Promise<Account | null>;
}

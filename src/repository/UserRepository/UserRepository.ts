import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { User } from '../../users/entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User | null>;
  abstract update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null>;
  abstract remove(id: number): Promise<User | null>;
}

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): User;
  abstract findAll(): User[];
  abstract findOne(id: number): User;
  abstract update(id: number, updateUserDto: UpdateUserDto): User;
  abstract remove(id: number): void;
}
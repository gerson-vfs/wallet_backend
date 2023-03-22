import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './UserRepository';

@Injectable()
export class MemoryUserRepository implements UserRepository {
  protected id = 1;
  protected users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const now = new Date();

    const user = new User({
      id: this.id,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      createdAt: now,
      updatedAt: now,
    });

    this.users.push(user);
    this.id++;

    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const idx = this.users.findIndex((user) => user.id === id);

    const user = new User({
      id: this.users[idx].id,
      name: updateUserDto.name,
      email: this.users[idx].email,
      password: updateUserDto.password,
      createdAt: this.users[idx].createdAt,
      updatedAt: new Date(),
    });

    this.users[idx] = user;

    return user;
  }

  remove(id: number): void {
    const idx = this.users.findIndex((user) => user.id === id);
    this.users.splice(idx, 1);
  }
}

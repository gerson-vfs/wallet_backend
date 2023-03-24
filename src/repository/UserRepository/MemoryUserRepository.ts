import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './UserRepository';

@Injectable()
export class MemoryUserRepository implements UserRepository {
  protected id = 1;
  protected users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User | null> {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx === -1) {
      return null;
    }

    return this.users[idx];
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx === -1) {
      return null;
    }

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

  async remove(id: number): Promise<User | null> {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx == -1) {
      return null;
    }

    const user = this.users[idx];
    this.users.splice(idx, 1);
    return user;
  }
}

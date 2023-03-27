import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../accounts/dto/create-user.dto';
import { UpdateUserDto } from '../../accounts/dto/update-user.dto';
import { Account } from '../../accounts/entities/user.entity';
import { UserRepository } from './UserRepository';

@Injectable()
export class MemoryUserRepository implements UserRepository {
  protected id = 1;
  protected users: Account[] = [];

  async create(createUserDto: CreateUserDto): Promise<Account> {
    const now = new Date();

    const user = new Account({
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

  async findAll(): Promise<Account[]> {
    return this.users;
  }

  async findOne(id: number): Promise<Account | null> {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx === -1) {
      return null;
    }

    return this.users[idx];
  }

  async findByEmail(email: string): Promise<Account | null> {
    const idx = this.users.findIndex((user) => user.email === email);

    if (idx === -1) {
      return null;
    }

    return this.users[idx];
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Account | null> {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx === -1) {
      return null;
    }

    const user = new Account({
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

  async remove(id: number): Promise<Account | null> {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx == -1) {
      return null;
    }

    const user = this.users[idx];
    this.users.splice(idx, 1);
    return user;
  }
}

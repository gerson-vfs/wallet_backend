import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from '../repository/UserRepository/UserRepository';
import { MemoryUserRepository } from '../repository/UserRepository/MemoryUserRepository';
import { CreateUserUseCase } from './usecases/CreateUserUseCase';
import { FindAllUsersUseCase } from './usecases/FindAllUsersUseCase';
import { FindUserUseCase } from './usecases/FindUserUseCase';
import { RemoveUserUseCase } from './usecases/RemoveUserUseCase';
import { UpdateUserUseCase } from './usecases/UpdateUseCase';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: MemoryUserRepository,
    },
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindUserUseCase,
    RemoveUserUseCase,
    UpdateUserUseCase,
  ],
})
export class UsersModule {}

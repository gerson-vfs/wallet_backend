import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { UserRepository } from '../repository/UserRepository/UserRepository';
import { MemoryUserRepository } from '../repository/UserRepository/MemoryUserRepository';
import { CreateAccountUseCase } from './usecases/CreateAccountUseCase';
import { FindAllAccountsUseCase } from './usecases/FindAllAccountsUseCase';
import { FindAccountUseCase } from './usecases/FindAccountUseCase';
import { RemoveAccountUseCase } from './usecases/RemoveAccountUseCase';
import { UpdateAccountUseCase } from './usecases/UpdateAccountUseCase';

@Module({
  controllers: [AccountsController],
  providers: [
    {
      provide: UserRepository,
      useClass: MemoryUserRepository,
    },
    CreateAccountUseCase,
    FindAllAccountsUseCase,
    FindAccountUseCase,
    RemoveAccountUseCase,
    UpdateAccountUseCase,
  ],
})
export class AccountsModule {}

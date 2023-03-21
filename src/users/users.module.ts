import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/UserRepository';
import { MemoryUserRepository } from './repository/MemoryUserRepository';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: MemoryUserRepository,
    },
  ],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './accounts/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransfersModule } from './transfers/transfers.module';

@Module({
  imports: [UsersModule, TransactionsModule, TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

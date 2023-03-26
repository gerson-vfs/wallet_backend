import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransfersModule } from './transfers/transfers.module';

@Module({
  imports: [AccountsModule, TransactionsModule, TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

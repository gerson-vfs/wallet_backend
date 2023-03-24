import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTransactionDto } from './domain/dto/create-transaction.dto';
import { UpdateTransactionDto } from './domain/dto/update-transaction.dto';
import { TransactionRepository } from '../repository/TransactionRepository/TransactionRepository';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionRepository.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionRepository.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionRepository.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionRepository.remove(+id);
  }
}

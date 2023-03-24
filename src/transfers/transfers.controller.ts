import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransferDto } from './domain/dto/create-transfer.dto';
import { CreateTransferUseCase } from './domain/usecases/CreateTransferUseCase';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly createTransferUseCase: CreateTransferUseCase) {}

  @Post()
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.createTransferUseCase.execute(createTransferDto);
  }
}

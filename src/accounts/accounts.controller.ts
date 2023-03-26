import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AccountAlreadyExistsError } from '../errors/AccountAlreadyExistsError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { CreateAccountUseCase } from './usecases/CreateAccountUseCase';
import { FindAllAccountsUseCase } from './usecases/FindAllAccountsUseCase';
import { FindAccountUseCase } from './usecases/FindAccountUseCase';
import { RemoveAccountUseCase } from './usecases/RemoveAccountUseCase';
import { UpdateAccountUseCase } from './usecases/UpdateAccountUseCase';
import { AccountNotFoundError } from 'src/errors/AccountNotFoundError';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly findAccountUseCase: FindAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
    private readonly removeAccountUseCase: RemoveAccountUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createAccountUseCase.execute(createUserDto);
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw error;
    }
  }

  @Get()
  async findAll() {
    return await this.findAllAccountsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.findAccountUseCase.execute(+id);
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateAccountUseCase.execute(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.removeAccountUseCase.execute(+id);
  }
}

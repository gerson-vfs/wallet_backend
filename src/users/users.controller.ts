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
import { UserAlreadyExistsError } from 'src/errors/UserElreadyExistsError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { CreateUserUseCase } from './usecases/CreateUserUseCase';
import { FindAllUsersUseCase } from './usecases/FindAllUsersUseCase';
import { FindUserUseCase } from './usecases/FindUserUseCase';
import { RemoveUserUseCase } from './usecases/RemoveUserUseCase';
import { UpdateUserUseCase } from './usecases/UpdateUseCase';

@Controller('accounts')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw error;
    }
  }

  @Get()
  async findAll() {
    return await this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findUserUseCase.execute(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserUseCase.execute(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.removeUserUseCase.execute(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { CreateUserUseCase } from './usecases/CreateUserUseCase';
import { FindAllUsersUseCase } from './usecases/FindAllUsersUseCase';
import { FindUserUseCase } from './usecases/FindUserUseCase';
import { RemoveUserUseCase } from './usecases/RemoveUserUseCase';
import { UpdateUserUseCase } from './usecases/UpdateUseCase';

@Controller('users')
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
    return await this.createUserUseCase.execute(createUserDto);
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

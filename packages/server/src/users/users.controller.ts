import { UsersService } from './users.service';
import { UsersDto } from './users.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() usersDto: UsersDto) {
    return this.usersService.createUser(usersDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}

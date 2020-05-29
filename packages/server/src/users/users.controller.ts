import { UsersService } from './users.service';
import { UsersDto } from './users.dto';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() usersDto: UsersDto) {
    return this.usersService.createUser(usersDto);
  }
}

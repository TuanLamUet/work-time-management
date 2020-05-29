import { UsersDto } from './users.dto';
import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  async createUser(usersDto: UsersDto) {
   try {
    const { email, password, role } = usersDto;
    const roundSalt = 8;
    const salt = await bcrypt.genSalt(roundSalt);
    
    const user = new Users();
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    user.role = role;
    user.save()
    return {
      message: 'success'
    }
   } catch (error) {
     return {
       error: error
     }
   }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

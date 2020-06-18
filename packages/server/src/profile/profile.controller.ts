import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileDto } from './profile.dto';
import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Get,
  UseInterceptors,
  UploadedFile,
  Post,
  Delete,
} from '@nestjs/common';
import { User } from 'src/users/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { imageFileFilter } from './imageFilter';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  //get profile user
  @Get()
  getProfile(@User() user) {
    return this.profileService.getProfile(user);
  }

  //create profile user
  @Post()
  @UsePipes(ValidationPipe)
  createProfile(@User() user, @Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(user, profileDto);
  }
  
  @Put()
  @UsePipes(ValidationPipe)
  updateProfile(@User() user, @Body() profileDto: ProfileDto) {
    return this.profileService.updateProfile(user, profileDto)
  }

  //create new position by admin
  @Put('/admin/position')
  createNewPosition(@Body('name') positionName: string) {
    return this.profileService.createNewPosition(positionName)
  }
  
  //add new position to profile user
  @Post('/position')
  addPositionToProfile(@User() user, @Body('positionName') positionsName: string) {
    return this.profileService.addPositionToProfile(user, positionsName)
  }

  //delete a position
  @Delete('/position')
  deleteAPosition(@User() user, @Body('positionName') positionName: string) {
    return this.profileService.deleteAPosition(user, positionName)
  }

  @Put('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: imageFileFilter,

    }),
  )
  uploadFile(@User() user, @UploadedFile() file) {
    console.log(file)
    return this.profileService.uploadAvatar(user, file);
  }

}

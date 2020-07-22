import { HttpException, HttpStatus } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Only image files are allowed!',
        },
        HttpStatus.FORBIDDEN,
      ),
      false,
    );
  }
  callback(null, true);
};

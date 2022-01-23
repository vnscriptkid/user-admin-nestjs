import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto';
import { Response } from 'express';

@Controller('uploads')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const randomName = crypto.randomBytes(16).toString('hex');
          return callback(null, `${randomName}.${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://localhost:8000/api/${file.path}`,
    };
  }

  @Get(':path')
  getImage(@Param('path') path: string, @Res() response: Response) {
    return response.sendFile(path, { root: 'uploads' });
  }
}

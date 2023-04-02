import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoreFileUseCase } from './usecases/storeFile.usecase';

@Controller('files')
class FilesController {
  constructor(
    @Inject('StoreFileUseCase')
    private readonly storeFileUseCase: StoreFileUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.storeFileUseCase.doit(file);
  }
}

export { FilesController };

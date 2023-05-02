import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoreFileUseCase } from './usecases/storeFile.usecase';
import {
  DeleteFileDTO,
  DeleteFileUseCase,
} from './usecases/deleteFile.usecase';

@Controller('files')
class FilesController {
  constructor(
    @Inject('StoreFileUseCase')
    private readonly storeFileUseCase: StoreFileUseCase,
    @Inject('DeleteFileUseCase')
    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.storeFileUseCase.doit(file);
  }

  @Delete()
  delete(@Body() deleteFileDTO: DeleteFileDTO) {
    return this.deleteFileUseCase.doit(deleteFileDTO);
  }
}

export { FilesController };

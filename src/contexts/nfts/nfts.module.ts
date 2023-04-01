import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { StorageService } from './storage.service';
import { StoreFileUseCase } from './usecases/storeFile.usecase';

@Module({
  controllers: [FilesController],
  providers: [
    {
      provide: 'StoreFileUseCase',
      useClass: StoreFileUseCase,
    },
    {
      provide: 'StorageService',
      useClass: StorageService,
    },
  ],
})
export class NftsModule {}

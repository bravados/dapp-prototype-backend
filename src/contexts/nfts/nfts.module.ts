import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { NftsController } from './nft.controller';
import { NftPrismaRepository } from './nft.repository';
import { StorageService } from './storage.service';
import { CreateNftUseCase } from './usecases/createNft.usecase';
import { StoreFileUseCase } from './usecases/storeFile.usecase';
import { GetNftUseCase } from './usecases/getNft.usecase';
import { DeleteFileUseCase } from './usecases/deleteFile.usecase';

@Module({
  controllers: [FilesController, NftsController],
  providers: [
    {
      provide: 'StoreFileUseCase',
      useClass: StoreFileUseCase,
    },
    {
      provide: 'CreateNftUseCase',
      useClass: CreateNftUseCase,
    },
    {
      provide: 'DeleteFileUseCase',
      useClass: DeleteFileUseCase,
    },
    {
      provide: 'GetNftUseCase',
      useClass: GetNftUseCase,
    },
    {
      provide: 'StorageService',
      useClass: StorageService,
    },
    {
      provide: 'NftRepository',
      useClass: NftPrismaRepository,
    },
  ],
})
export class NftsModule {}

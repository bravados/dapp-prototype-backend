import { UseCase } from '@infrastructure/usecases';
import { Inject, Injectable } from '@nestjs/common';
import { StorageService } from '../storage.service';
import { IPFSFile } from '../nft.entity';

@Injectable()
class StoreFileUseCase implements UseCase<IPFSFile> {
  constructor(
    @Inject('StorageService') private readonly storageService: StorageService,
  ) {}

  doit(file: Express.Multer.File): Promise<IPFSFile> {
    return this.storageService.create(file);
  }
}

export { StoreFileUseCase };

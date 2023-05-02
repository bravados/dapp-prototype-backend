import { UseCase } from '@infrastructure/usecases';
import { Inject, Injectable } from '@nestjs/common';
import { StorageService } from '../storage.service';

class DeleteFileDTO {
  cid: string;
}

@Injectable()
class DeleteFileUseCase implements UseCase<void> {
  constructor(
    @Inject('StorageService') private readonly storageService: StorageService,
  ) {}

  doit(deleteFileDTO: DeleteFileDTO): Promise<void> {
    return this.storageService.delete(deleteFileDTO);
  }
}

export { DeleteFileUseCase, DeleteFileDTO };

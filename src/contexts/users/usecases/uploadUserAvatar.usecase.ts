import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '@infrastructure/usecases';
import { S3Service } from '../s3.service';
import { UserRepository } from '../user.repository';

class UploadUserAvatarDTO {
  userId: string;
  file: any;
}

type UploadFileResponse = {
  filename: string;
};

@Injectable()
class UploadUserAvatarUseCase implements UseCase<UploadFileResponse> {
  constructor(
    @Inject('S3Service')
    private s3Service: S3Service,
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async doit({
    userId,
    file,
  }: UploadUserAvatarDTO): Promise<UploadFileResponse> {
    const extension = file.originalname.split('.').pop();
    const epochTime = new Date().getTime();
    const newFilename = `${userId}_${epochTime}.${extension}`;

    try {
      await this.s3Service.uploadFile('avatars', newFilename, file);

      await this.userRepository.updateAvatar({
        userId: parseInt(userId),
        filename: newFilename,
      });

      return { filename: newFilename };
    } catch (error) {
      Logger.error(`Failed to change avatar`, error);
      throw error;
    }
  }
}

export { UploadUserAvatarUseCase, UploadUserAvatarDTO, UploadFileResponse };

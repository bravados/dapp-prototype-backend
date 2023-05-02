import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '@infrastructure/usecases';
import { S3Service } from '../s3.service';
import { UserRepository } from '../user.repository';

class RemoveUserAvatarDTO {
  userId: string;
}

@Injectable()
class RemoveUserAvatarUseCase implements UseCase<void> {
  constructor(
    @Inject('S3Service')
    private s3Service: S3Service,
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async doit(params: RemoveUserAvatarDTO): Promise<void> {
    const userId = parseInt(params.userId);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      Logger.error(`User not found: ${userId}`, 'RemoveUserAvatarUseCase');
      throw new Error('User not found');
    }

    if (!user.avatar) {
      Logger.error(
        `User does not have an avatar: ${userId}`,
        'RemoveUserAvatarUseCase',
      );
      throw new Error('User does not have an avatar');
    }

    try {
      await this.s3Service.deleteFile('avatars', user.avatar);

      await this.userRepository.updateAvatar({
        userId,
        filename: null,
      });
    } catch (error) {
      Logger.error(`Failed to remove avatar`, error);
      throw error;
    }
  }
}

export { RemoveUserAvatarUseCase, RemoveUserAvatarDTO };

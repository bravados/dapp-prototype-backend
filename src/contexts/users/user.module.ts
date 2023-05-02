import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './usecases/createUser.usecase';
import { GetUserUseCase } from './usecases/getUser.usecase';
import { UserController } from './user.controller';
import { UserPrismaRepository } from './user.repository';
import { GetUserIdsUseCase } from './usecases/getUserIds.usecase';
import { GetUserByIdUseCase } from './usecases/getUserById.usecase';
import { UpdateUserProfileUseCase } from './usecases/updateUserProfile.usecase';
import { UploadUserAvatarUseCase } from './usecases/uploadUserAvatar.usecase';
import { RemoveUserAvatarUseCase } from './usecases/removeUserAvatar.usecase';
import { S3Service } from './s3.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'CreateUserUseCase',
      useClass: CreateUserUseCase,
    },
    {
      provide: 'GetUserUseCase',
      useClass: GetUserUseCase,
    },
    {
      provide: 'GetUserIdsUseCase',
      useClass: GetUserIdsUseCase,
    },
    {
      provide: 'GetUserByIdUseCase',
      useClass: GetUserByIdUseCase,
    },
    {
      provide: 'RemoveUserAvatarUseCase',
      useClass: RemoveUserAvatarUseCase,
    },
    {
      provide: 'S3Service',
      useClass: S3Service,
    },
    {
      provide: 'UpdateUserProfileUseCase',
      useClass: UpdateUserProfileUseCase,
    },
    {
      provide: 'UploadUserAvatarUseCase',
      useClass: UploadUserAvatarUseCase,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
})
class UserModule {}

export { UserModule };

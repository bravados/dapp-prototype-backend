import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './usecases/createUser.usecase';
import { GetUserUseCase } from './usecases/getUser.usecase';
import { UserController } from './user.controller';
import { UserPrismaRepository } from './user.repository';
import { GetUserIdsUseCase } from './usecases/getUserIds.usecase';
import { GetUserByIdUseCase } from './usecases/getUserById.usecase';
import { UpdateUserProfileUseCase } from './usecases/updateUserProfile.usecase';

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
      provide: 'UpdateUserProfileUseCase',
      useClass: UpdateUserProfileUseCase,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
})
class UserModule {}

export { UserModule };

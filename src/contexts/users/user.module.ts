import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './usecases/createUser.usecase';
import { GetUserUseCase } from './usecases/getUser.usecase';
import { UserController } from './user.controller';
import { UserPrismaRepository } from './user.repository';

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
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
})
class UserModule {}

export { UserModule };

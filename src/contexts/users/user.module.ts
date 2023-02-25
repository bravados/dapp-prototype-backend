import { Module } from '@nestjs/common';
import { FindByWalletUseCase } from './usecases/findByWallet.user.usecase';
import { UserController } from './user.controller';
import { UserPrismaRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'FindByWalletUseCase',
      useClass: FindByWalletUseCase,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
})
class UserModule {}

export { UserModule };

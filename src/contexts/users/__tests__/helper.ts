import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UserController } from '../user.controller';
import { FindByWalletUseCase } from '../usecases/findByWallet.user.usecase';
import { UserRepository } from '../user.repository';

type Providers = {
  findByWalletUseCase?: FindByWalletUseCase;
  userRepository?: UserRepository;
};

const createApp = async (params: Providers) => {
  const userModule = await Test.createTestingModule({
    controllers: [UserController],
    providers: [
      {
        provide: 'FindByWalletUseCase',
        useValue: params.findByWalletUseCase,
      },
      {
        provide: 'UserRepository',
        useValue: params.userRepository,
      },
    ],
  }).compile();

  const app = userModule.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  return app;
};

export { createApp };

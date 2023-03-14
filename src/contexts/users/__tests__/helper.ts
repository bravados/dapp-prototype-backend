import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UserController } from '../user.controller';
import { CreateUserUseCase } from '../usecases/createUser.usecase';
import { GetUserUseCase } from '../usecases/getUser.usecase';
import { UserRepository } from '../user.repository';

type Providers = {
  createUserUseCase?: CreateUserUseCase;
  getUserUseCase?: GetUserUseCase;
  userRepository?: UserRepository;
};

const createApp = async (params: Providers) => {
  const userModule = await Test.createTestingModule({
    controllers: [UserController],
    providers: [
      {
        provide: 'CreateUserUseCase',
        useValue: params.createUserUseCase,
      },
      {
        provide: 'GetUserUseCase',
        useValue: params.getUserUseCase,
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

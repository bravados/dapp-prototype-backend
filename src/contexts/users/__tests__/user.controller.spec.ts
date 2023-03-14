import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateUserUseCase } from '../usecases/createUser.usecase';
import { GetUserUseCase } from '../usecases/getUser.usecase';
import { UserRepository } from '../user.repository';
import { createApp } from './helper';
import { user as userMock } from '../__mocks__/user';

const createUserUseCaseMock = {
  userRepository: {},
  doit: jest.fn(),
};

const getUserUseCaseMock = {
  userRepository: {},
  doit: jest.fn(),
};

const userRepositoryMock = {};

let app: INestApplication;
let server: any;

describe('find user by wallet', () => {
  beforeAll(async () => {
    app = await createApp({
      createUserUseCase: createUserUseCaseMock as unknown as CreateUserUseCase,
      getUserUseCase: getUserUseCaseMock as unknown as GetUserUseCase,
      userRepository: userRepositoryMock as unknown as UserRepository,
    });

    server = app.getHttpServer();
  });

  describe('when the blockchain is not supported', () => {
    it('returns 400', () => {
      return request(server)
        .post('/users')
        .send({ blockchain: 'ethereum', address: '123' })
        .expect(400);
    });
  });

  describe('when the address it not alphanumeric', () => {
    it('returns 400', () => {
      return request(server)
        .post('/users')
        .send({ blockchain: 'near', address: '-#!' })
        .expect(400);
    });
  });

  describe('getUser', () => {
    describe('when the user exists', () => {
      beforeEach(() => {
        getUserUseCaseMock.doit.mockReturnValue(userMock);
      });

      it('returns 200', () => {
        request(server).get('/users/near/123').expect(200);
      });
    });
    describe('when the user does not exist', () => {
      beforeEach(() => {
        getUserUseCaseMock.doit.mockReturnValue(null);
      });

      it('returns 404', () => {
        request(server).get('/users/near/123').expect(404);
      });
    });
  });

  describe('createUser', () => {
    describe('when the user cannot be created', () => {
      beforeEach(() => {
        createUserUseCaseMock.doit.mockRejectedValue(new Error());
      });

      it('returns 500', () => {
        return request(server)
          .post('/users')
          .send({ blockchain: 'near', address: '123' })
          .expect(500);
      });
    });
    describe('when the user can be created', () => {
      beforeEach(() => {
        createUserUseCaseMock.doit.mockReturnValue(userMock);
      });
      it('returns 201', () => {
        return request(server)
          .post('/users')
          .send({ blockchain: 'near', address: '123' })
          .expect(201);
      });
    });
  });

  afterAll(async () => {
    await app.close();
    server.close();
  });
});

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import type { FindByWalletUseCase } from '../usecases/findByWallet.user.usecase';
import { UserRepository } from '../user.repository';
import { UserNotFoundError } from '../user.error';
import { createApp } from './helper';

const doit = jest.fn();

const findByWalletUseCaseMock = {
  userRepository: {},
  doit,
};

const userRepositoryMock = {};

let app: INestApplication;
let server: any;

describe('find user by wallet', () => {
  beforeAll(async () => {
    app = await createApp({
      findByWalletUseCase:
        findByWalletUseCaseMock as unknown as FindByWalletUseCase,
      userRepository: userRepositoryMock as unknown as UserRepository,
    });

    server = app.getHttpServer();
  });

  describe('when the blockchain is not supported', () => {
    it('returns 400', () => {
      return request(server).get('/users/ethereum/123').expect(400);
    });
  });

  describe('when the address it not alphanumeric', () => {
    it('returns 400', () => {
      return request(server).get('/users/near/-#!').expect(400);
    });
  });

  describe('when the user is not found', () => {
    beforeEach(() => {
      doit.mockRejectedValue(new UserNotFoundError());
    });

    it('returns 404', () => {
      return request(server).get('/users/near/123').expect(404);
    });
  });

  describe('when the user is found', () => {
    beforeEach(() => {
      doit.mockReturnValue({});
    });

    it('returns the user', () => {
      request(server).get('/users/near/123').expect(200);
      expect(doit).toHaveBeenCalledWith({
        blockchain: 'near',
        address: '123',
      });
    });
  });

  afterAll(async () => {
    await app.close();
    server.close();
  });
});

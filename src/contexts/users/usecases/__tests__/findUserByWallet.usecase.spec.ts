import { user as userMock } from '@contexts/users/__mocks__/user';
import { GetUserUseCase } from '../getUser.usecase';

const userRepositoryMock = {
  create: jest.fn(),
  findByWallet: jest.fn(),
};

jest.mock('@contexts/users/user.repository', () => ({
  userRepository: userRepositoryMock,
}));

const params = {
  blockchain: 'NEAR',
  address: '123',
};

const wallet = {
  ...params,
  id: undefined,
  user: undefined,
};

describe('findUserByWallet', () => {
  describe('when the wallet cannot be found', () => {
    beforeEach(() => {
      userRepositoryMock.findByWallet.mockReturnValue(null);
    });

    it('returns null', async () => {
      const findByWalletUseCase = new GetUserUseCase(userRepositoryMock);

      expect(await findByWalletUseCase.doit(params)).toBeNull();

      expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
    });
  });

  describe('when the wallet is found', () => {
    beforeEach(() => {
      userRepositoryMock.findByWallet.mockReturnValue(userMock);
    });

    it('returns the user', async () => {
      const findByWalletUseCase = new GetUserUseCase(userRepositoryMock);

      expect(await findByWalletUseCase.doit(params)).toEqual(userMock);

      expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

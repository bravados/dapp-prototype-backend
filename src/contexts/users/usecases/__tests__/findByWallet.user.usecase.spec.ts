import { UserNotFoundError } from '../../user.error';
import { FindByWalletUseCase } from '../findByWallet.user.usecase';
import { user as userMock } from '@contexts/users/__mocks__/user';
import { Blockchain } from '@contexts/wallets/wallet.entity';

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

const user = {
  name: `${params.address}`,
  type: 'INDIVIDUAL',
  wallets: [
    {
      blockchain: params.blockchain as Blockchain,
      address: params.address,
    },
  ],
};

describe('findByWallet', () => {
  describe('when the wallet cannot be found', () => {
    describe('when the user can be created', () => {
      beforeEach(() => {
        userRepositoryMock.findByWallet.mockRejectedValue(new Error());
        userRepositoryMock.create.mockReturnValue(userMock);
      });

      it('creates the user', async () => {
        const findByWalletUseCase = new FindByWalletUseCase(userRepositoryMock);

        expect(await findByWalletUseCase.doit(params)).toBe(userMock);

        expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
        expect(userRepositoryMock.create).toHaveBeenCalledWith(user);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });
    });

    describe('when the user cannot be created', () => {
      beforeEach(() => {
        userRepositoryMock.findByWallet.mockRejectedValue(new Error());
        userRepositoryMock.create.mockRejectedValue(new Error());
      });

      it('throws an error', async () => {
        const findByWalletUseCase = new FindByWalletUseCase(userRepositoryMock);

        expect(findByWalletUseCase.doit(params)).rejects.toThrowError(
          UserNotFoundError,
        );

        expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });
    });
  });

  describe('when the wallet is found', () => {
    beforeEach(() => {
      userRepositoryMock.findByWallet.mockReturnValue(userMock);
    });

    it('returns the user', async () => {
      const findByWalletUseCase = new FindByWalletUseCase(userRepositoryMock);

      expect(await findByWalletUseCase.doit(params)).toEqual(userMock);

      expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

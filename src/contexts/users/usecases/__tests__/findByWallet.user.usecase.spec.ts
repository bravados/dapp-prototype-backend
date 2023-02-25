import { UnknownBlockchainError } from '@contexts/wallets/wallet.error';
import { UserNotFoundError } from '../../user.error';
import { FindByWalletUseCase } from '../findByWallet.user.usecase';

const userRepositoryMock = {
  findByWallet: jest.fn(),
};

jest.mock('@contexts/users/user.repository', () => ({
  userRepository: userRepositoryMock,
}));

describe('findByWallet', () => {
  describe('when the blockchain is not recognized', () => {
    it('throws a UnknownBlockchainError', async () => {
      const findByWalletUseCase = new FindByWalletUseCase(userRepositoryMock);
      const params = {
        blockchain: 'APTOS',
        address: '123',
      };

      expect(findByWalletUseCase.do(params)).rejects.toThrow(
        UnknownBlockchainError,
      );

      expect(userRepositoryMock.findByWallet).not.toHaveBeenCalled();
    });
  });

  describe('when the wallet cannot be found', () => {
    beforeEach(() => {
      userRepositoryMock.findByWallet.mockRejectedValue(new Error());
    });

    it('throws a UserNotFoundError', async () => {
      const findByWalletUseCase = new FindByWalletUseCase(userRepositoryMock);
      const params = {
        blockchain: 'NEAR',
        address: '123',
      };

      const wallet = {
        ...params,
        id: undefined,
        user: undefined,
      };

      expect(findByWalletUseCase.do(params)).rejects.toThrow(UserNotFoundError);

      expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
    });
  });

  describe('when the wallet is found', () => {
    beforeEach(() => {
      userRepositoryMock.findByWallet.mockReturnValue({});
    });

    it('returns the user', async () => {
      const findByWalletUseCase = new FindByWalletUseCase(userRepositoryMock);
      const params = {
        blockchain: 'NEAR',
        address: '123',
      };

      const wallet = {
        ...params,
        id: undefined,
        user: undefined,
      };

      expect(await findByWalletUseCase.do(params)).toEqual({});

      expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
    });
  });
});

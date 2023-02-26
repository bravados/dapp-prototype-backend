import { UserNotFoundError } from '../../user.error';
import { FindByWalletUseCase } from '../findByWallet.user.usecase';

const userRepositoryMock = {
  create: jest.fn(),
  findByWallet: jest.fn(),
};

jest.mock('@contexts/users/user.repository', () => ({
  userRepository: userRepositoryMock,
}));

describe('findByWallet', () => {
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

      expect(findByWalletUseCase.doit(params)).rejects.toThrow(
        UserNotFoundError,
      );

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

      expect(await findByWalletUseCase.doit(params)).toEqual({});

      expect(userRepositoryMock.findByWallet).toHaveBeenCalledWith(wallet);
    });
  });
});

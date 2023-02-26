import { wallet as walletMock } from '@contexts/wallets/__mocks__/wallet';
import { UserPrismaRepository } from '../user.repository';
import { user as userMock } from '../__mocks__/user';

const findFirstOrThrowMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findFirstOrThrow: findFirstOrThrowMock,
    },
  })),
}));

describe('User repository', () => {
  const repository = new UserPrismaRepository();

  describe('findByWallet', () => {
    const conditions = {
      where: {
        wallets: {
          some: {
            AND: {
              blockchain: {
                equals: walletMock.blockchain,
              },
              address: {
                equals: walletMock.address,
              },
            },
          },
        },
      },
      include: {
        wallets: {
          include: {
            user: false, // break circle dep.
          },
        },
      },
    };

    describe('when the wallet exists', () => {
      beforeEach(() => {
        findFirstOrThrowMock.mockReturnValue(userMock);
      });

      it('returns the user', async () => {
        const user = await repository.findByWallet(walletMock);

        expect(findFirstOrThrowMock).toHaveBeenCalledWith(conditions);
        expect(user).toEqual(userMock);
      });
    });

    describe('when the wallet does not exist', () => {
      beforeEach(() => {
        findFirstOrThrowMock.mockRejectedValue(new Error());
      });

      it('throws an error', async () => {
        await expect(
          repository.findByWallet(walletMock),
        ).rejects.toThrowError();
      });
    });
  });
});

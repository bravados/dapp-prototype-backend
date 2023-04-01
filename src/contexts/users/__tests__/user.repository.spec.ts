import { wallet as walletMock } from '@contexts/wallets/__mocks__/wallet';
import { UserPrismaRepository } from '../user.repository';
import { user as userMock } from '../__mocks__/user';

const createMock = jest.fn();
const findFirstMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: createMock,
      findFirst: findFirstMock,
    },
    $on: jest.fn(),
  })),
}));

describe('User repository', () => {
  const repository = new UserPrismaRepository();

  describe('create', () => {
    describe('when creation successful', () => {
      beforeEach(() => {
        createMock.mockReturnValue(userMock);
      });

      it('returns the user', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { wallets, royalties, ...rest } = userMock;

        expect(await repository.create(userMock)).toBe(userMock);
        expect(createMock).toHaveBeenCalledWith({
          data: {
            ...rest,
            wallets: {
              create: wallets,
            },
          },
          include: {
            wallets: {
              include: {
                user: false, // break circle dep.
              },
            },
            royalties: {
              include: {
                user: false, // break circle dep.
                wallet: {
                  include: {
                    user: {
                      include: {
                        wallets: false,
                        royalties: false,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      });
    });

    describe('when creation fails', () => {
      beforeEach(() => {
        createMock.mockRejectedValue(new Error());
      });

      it('throws error', () => {
        expect(repository.create(userMock)).rejects.toThrowError();
      });
    });
  });

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
        royalties: {
          include: {
            user: false, // break circle dep.
            wallet: {
              include: {
                user: {
                  include: {
                    wallets: false,
                    royalties: false,
                  },
                },
              },
            },
          },
        },
      },
    };

    describe('when the wallet exists', () => {
      beforeEach(() => {
        findFirstMock.mockReturnValue(userMock);
      });

      it('returns the user', async () => {
        const user = await repository.findByWallet(walletMock);

        expect(findFirstMock).toHaveBeenCalledWith(conditions);
        expect(user).toEqual(userMock);
      });
    });

    describe('when the wallet does not exist', () => {
      beforeEach(() => {
        findFirstMock.mockReturnValue(null);
      });

      it('returns null', async () => {
        expect(await repository.findByWallet(walletMock)).toBeNull();
      });
    });
  });
});

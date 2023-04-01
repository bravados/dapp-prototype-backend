import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Wallet } from '@contexts/wallets/wallet.entity';
import { User } from './user.entity';

interface UserRepository {
  create(user: User): Promise<User>;
  findByWallet(wallet: Wallet): Promise<User | null>;
}

class UserPrismaRepository extends PrismaRepository implements UserRepository {
  private repository;

  constructor() {
    super();
    this.repository = this.getClient().user;
  }

  async create(user: User): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { wallets, royalties, ...rest } = user;

    return await this.repository.create({
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
  }

  async findByWallet(wallet: Wallet): Promise<User | null> {
    return this.repository.findFirst({
      where: {
        wallets: {
          some: {
            AND: {
              blockchain: {
                equals: wallet.blockchain,
              },
              address: {
                equals: wallet.address,
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
    });
  }
}

export { UserRepository, UserPrismaRepository };

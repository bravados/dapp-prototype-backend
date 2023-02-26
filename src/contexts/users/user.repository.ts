import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Wallet } from '@contexts/wallets/wallet.entity';
import { User } from './user.entity';

interface UserRepository {
  create(user: User): Promise<User>;
  findByWallet(wallet: Wallet): Promise<User>;
}

class UserPrismaRepository extends PrismaRepository implements UserRepository {
  private repository;

  constructor() {
    super();
    this.repository = this.getClient().user;
  }

  async create(user: User): Promise<User> {
    const { wallets, ...rest } = user;

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
      },
    });
  }

  async findByWallet(wallet: Wallet): Promise<User> {
    return this.repository.findFirstOrThrow({
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
      },
    });
  }
}

export { UserRepository, UserPrismaRepository };

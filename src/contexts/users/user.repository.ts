import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Wallet } from '@contexts/wallets/wallet.entity';
import { User } from './user.entity';

interface UserRepository {
  findByWallet(wallet: Wallet): Promise<User>;
}

class UserPrismaRepository extends PrismaRepository implements UserRepository {
  private repository;

  constructor() {
    super();
    this.repository = this.getClient().user;
  }

  async findByWallet(wallet: Wallet): Promise<User> {
    const user = await this.repository.findFirstOrThrow({
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
    });

    return user as User;
  }
}

export { UserPrismaRepository };

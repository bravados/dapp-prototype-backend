import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Wallet } from '@contexts/wallets/wallet.entity';
import { User } from './user.entity';

interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByWallet(wallet: Wallet): Promise<User | null>;
  getAllIds(): Promise<number[]>;
  update(user: User): Promise<User>;
}

class UserPrismaRepository extends PrismaRepository implements UserRepository {
  private repository;

  constructor() {
    super();
    this.repository = this.getClient().user;
  }

  async create(user: User): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { wallets, royalties, nfts, ...rest } = user;

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
        nfts: {
          include: {
            creator: true,
          },
        },
      },
    });
  }

  findById(id: number): Promise<User | null> {
    return this.repository.findUnique({
      where: {
        id,
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
        nfts: {
          include: {
            creator: true,
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
        nfts: {
          include: {
            creator: true,
          },
        },
      },
    });
  }

  async getAllIds(): Promise<number[]> {
    const users = await this.repository.findMany({
      select: {
        id: true,
      },
    });

    return users.map((user) => user.id);
  }

  async update(user: User): Promise<User> {
    const { name, email } = user;

    return await this.repository.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
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
        nfts: {
          include: {
            creator: true,
          },
        },
      },
    });
  }
}

export { UserRepository, UserPrismaRepository };

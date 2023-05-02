import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Wallet } from '@contexts/wallets/wallet.entity';
import { User } from './user.entity';

type UpdateAvatarParams = {
  userId: number;
  filename: string | null;
};

type UpdateProfileParams = {
  userId: number;
  name: string;
  email?: string;
};

interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByWallet(wallet: Wallet): Promise<User | null>;
  getAllIds(): Promise<number[]>;
  updateAvatar(params: UpdateAvatarParams): Promise<User>;
  updateProfileData(params: UpdateProfileParams): Promise<User>;
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

  async updateAvatar({ userId, filename }: UpdateAvatarParams): Promise<User> {
    return await this.repository.update({
      where: {
        id: userId,
      },
      data: {
        avatar: filename,
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

  async updateProfileData({
    userId,
    name,
    email,
  }: UpdateProfileParams): Promise<User> {
    return await this.repository.update({
      where: {
        id: userId,
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

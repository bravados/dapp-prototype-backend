import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Nft } from './nft.entity';
import { Blockchain } from '@contexts/wallets/wallet.entity';

interface NftRepository {
  create(nft: Nft): Promise<Nft>;

  findByBlockchainAndId(
    blockchain: Blockchain,
    id: string,
  ): Promise<Nft | null>;

  getAllIdsByBlockchain(
    blockchain: Blockchain,
  ): Promise<string[]>;
}

class NftPrismaRepository extends PrismaRepository implements NftRepository {
  private repository;

  constructor() {
    super();
    this.repository = this.getClient().nft;
  }

  async create(nft: Nft): Promise<Nft> {
    return await this.repository.create({
      data: {
        ...nft,
        creator: {
          connect: {
            id: nft.creator.id,
          },
        },
      },
      include: {
        creator: true,
      },
    });
  }

  async findByBlockchainAndId(
    blockchain: 'NEAR',
    id: string,
  ): Promise<Nft | null> {
    return this.repository.findUnique({
      where: {
        id_blockchain: {
          id,
          blockchain,
        },
      },
      include: {
        creator: true,
      },
    });
  }

  async getAllIdsByBlockchain(blockchain: 'NEAR'): Promise<string[]> {
    const nfts = await this.repository.findMany({
      where: {
        blockchain: {
          equals: blockchain,
        },
      },
      select: {
        id: true,
      },
    });
    return nfts.map((nft) => nft.id);
  }
}

export { NftRepository, NftPrismaRepository };

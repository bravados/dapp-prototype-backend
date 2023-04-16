import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Nft } from './nft.entity';
import { Blockchain } from '@contexts/wallets/wallet.entity';

interface NftRepository {
  create(nft: Nft): Promise<Nft>;
  findByBlockchainAndId(
    blockchain: Blockchain,
    id: string,
  ): Promise<Nft | null>;
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
    });
  }
}

export { NftRepository, NftPrismaRepository };

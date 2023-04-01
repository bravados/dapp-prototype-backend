import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Nft } from './nft.entity';

interface NftRepository {
  create(nft: Nft): Promise<Nft>;
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
}

export { NftRepository, NftPrismaRepository };

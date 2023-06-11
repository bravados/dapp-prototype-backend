import { PrismaRepository } from '@infrastructure/database/prisma.repository';
import { Blockchain } from '@contexts/wallets/wallet.entity';
import { Nft } from './nft.entity';
import { CreateNftDTO } from './usecases/createNft.usecase';

interface NftRepository {
  create(createNftDTO: CreateNftDTO): Promise<Nft>;

  findByBlockchainAndId(
    blockchain: Blockchain,
    id: string,
  ): Promise<Nft | null>;

  findAll(): Promise<Nft[]>;

  getAllIdsByBlockchain(blockchain: Blockchain): Promise<string[]>;
}

class NftPrismaRepository extends PrismaRepository implements NftRepository {
  private repository;

  constructor() {
    super();
    this.repository = this.getClient().nft;
  }

  async create(createNftDTO: CreateNftDTO): Promise<Nft> {
    return await this.repository.create({
      data: {
        id: createNftDTO.id,
        title: createNftDTO.title,
        description: createNftDTO.description,
        media: createNftDTO.media,
        blockchain: createNftDTO.blockchain as Blockchain,
        creator: {
          connect: {
            id: createNftDTO.creator.id,
          },
        },
      },
      include: {
        creator: true,
      },
    });
  }

  async findAll(): Promise<Nft[]> {
    return this.repository.findMany({
      include: {
        creator: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
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

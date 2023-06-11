import { Inject, Injectable } from '@nestjs/common';
import {
  IsNotEmpty,
  IsSupportedBlockchain,
} from '@infrastructure/http/validators';
import { UseCase } from '@infrastructure/usecases';
import { Blockchain } from '@contexts/wallets/wallet.entity';
import { Nft } from '../nft.entity';
import { NftRepository } from '../nft.repository';
import { NftList } from '../nft.types';

@Injectable()
class GetNftsUseCase implements UseCase<NftList> {
  constructor(
    @Inject('NftRepository') private readonly nftRepository: NftRepository,
  ) {}

  async doit(): Promise<NftList> {
    const nfts = await this.nftRepository.findAll();

    return { nfts } as NftList;
  }
}

export { GetNftsUseCase };

import { Inject, Injectable } from '@nestjs/common';
import {
  IsSupportedBlockchain,
} from '@infrastructure/http/validators';
import { UseCase } from '@infrastructure/usecases';
import { Blockchain } from '@contexts/wallets/wallet.entity';
import { NftRepository } from '../nft.repository';

class GetNftIdsDTO {
  @IsSupportedBlockchain({ message: 'Blockchain not supported' })
  blockchain: Blockchain;
}

@Injectable()
class GetNftIdsUseCase implements UseCase<string[]> {
  constructor(
    @Inject('NftRepository') private readonly nftRepository: NftRepository,
  ) { }

  doit({ blockchain }: GetNftIdsDTO): Promise<string[]> {
    return this.nftRepository.getAllIdsByBlockchain(
      blockchain.toUpperCase() as Blockchain
    );
  }
}

export { GetNftIdsDTO, GetNftIdsUseCase };

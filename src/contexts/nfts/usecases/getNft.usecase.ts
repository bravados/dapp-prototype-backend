import { Inject, Injectable } from '@nestjs/common';
import {
  IsNotEmpty,
  IsSupportedBlockchain,
} from '@infrastructure/http/validators';
import { UseCase } from '@infrastructure/usecases';
import { Blockchain } from '@contexts/wallets/wallet.entity';
import { Nft } from '../nft.entity';
import { NftRepository } from '../nft.repository';

class GetNftDTO {
  @IsNotEmpty()
  id: string;

  @IsSupportedBlockchain({ message: 'Blockchain not supported' })
  blockchain: Blockchain;
}

@Injectable()
class GetNftUseCase implements UseCase<Nft | null> {
  constructor(
    @Inject('NftRepository') private readonly nftRepository: NftRepository,
  ) {}

  doit({ id, blockchain }: GetNftDTO): Promise<Nft | null> {
    return this.nftRepository.findByBlockchainAndId(
      blockchain.toUpperCase() as Blockchain, // why is class-transformer not writing the transformed value to the DTO?
      id,
    );
  }
}

export { GetNftDTO, GetNftUseCase };

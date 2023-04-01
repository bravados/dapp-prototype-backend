import { Blockchain } from '.prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsSupportedBlockchain,
} from '@infrastructure/http/validators';
import { UseCase } from '@infrastructure/usecases';
import { Inject, Injectable } from '@nestjs/common';
import { Nft } from '../nft.entity';
import { NftRepository } from '../nft.repository';

class CreateNftDTO {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  media: string;

  @IsNotEmpty()
  price: string;

  @IsSupportedBlockchain({ message: 'Blockchain not supported' })
  blockchain: string;
}

@Injectable()
class CreateNftUseCase implements UseCase<Nft> {
  constructor(
    @Inject('NftRepository') private readonly nftRepository: NftRepository,
  ) {}

  doit({
    id,
    title,
    description,
    media,
    price,
    blockchain,
  }: CreateNftDTO): Promise<Nft> {
    return this.nftRepository.create({
      id,
      title,
      description,
      media,
      price,
      blockchain: blockchain as Blockchain,
    });
  }
}

export { CreateNftDTO, CreateNftUseCase };

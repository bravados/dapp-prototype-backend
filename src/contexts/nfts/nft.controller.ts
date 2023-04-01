import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { Nft } from './nft.entity';
import { CreateNftDTO, CreateNftUseCase } from './usecases/createNft.usecase';

@Controller('nfts')
class NftsController {
  constructor(
    @Inject('CreateNftUseCase')
    private readonly createNftUseCase: CreateNftUseCase,
  ) {}

  @Post()
  async createNft(@Body() createNftDTO: CreateNftDTO): Promise<Nft> {
    try {
      return await this.createNftUseCase.doit(createNftDTO);
    } catch {
      Logger.error('NFT was not created: ', createNftDTO);
      throw new HttpException(
        'NFT was not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export { NftsController };

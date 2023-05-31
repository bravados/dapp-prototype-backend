import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { Nft } from './nft.entity';
import { CreateNftDTO, CreateNftUseCase } from './usecases/createNft.usecase';
import { GetNftDTO, GetNftUseCase } from './usecases/getNft.usecase';
import { GetNftIdsDTO, GetNftIdsUseCase } from './usecases/getNftIds.usecase';

@Controller('nfts')
class NftsController {
  constructor(
    @Inject('CreateNftUseCase')
    private readonly createNftUseCase: CreateNftUseCase,
    @Inject('GetNftUseCase')
    private readonly getNftUseCase: GetNftUseCase,
    @Inject('GetNftIdsUseCase')
    private readonly getNftIdsUseCase: GetNftIdsUseCase,
  ) { }

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

  @Get('/:blockchain/:id')
  async getNft(@Param() getNftDTO: GetNftDTO): Promise<Nft> {
    const nft = await this.getNftUseCase.doit(getNftDTO);
    if (!nft) {
      Logger.error('NFT not found: ', getNftDTO);
      throw new HttpException('NFT not found', HttpStatus.NOT_FOUND);
    }
    return nft;
  }

  @Get('/:blockchain')
  async getNftIds(@Param() getNftIdsDTO: GetNftIdsDTO): Promise<{ ids: string[] }> {
    const ids = await this.getNftIdsUseCase.doit(getNftIdsDTO);

    return {ids};
  }

}

export { NftsController };

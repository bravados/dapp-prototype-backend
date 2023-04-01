import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Blob, NFTStorage } from 'nft.storage';

interface EnvironmentVariables {
  IPFS_TOKEN: string;
}

@Injectable()
class StorageService {
  // IPFS (Interplanetary File System) client
  private nftStorageClient: any;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    const ipfsToken = this.configService.get('IPFS_TOKEN', { infer: true });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.nftStorageClient = new NFTStorage({ token: ipfsToken! });
  }

  async create(file: Express.Multer.File) {
    const blob = new Blob([file.buffer]);
    const cid = await this.nftStorageClient.storeBlob(blob);

    return {
      cid,
    };
  }
}

export { StorageService };

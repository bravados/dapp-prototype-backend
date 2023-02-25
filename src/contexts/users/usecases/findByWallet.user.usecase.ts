import { Inject, Injectable } from '@nestjs/common';
import { Blockchain, Wallet } from '@contexts/wallets/wallet.entity';
import {
  IsAlphanumeric,
  IsSupportedBlockchain,
} from '@infrastructure/http/validators';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import { UserNotFoundError } from '../user.error';

class FindByWalletUseCaseDTO {
  @IsSupportedBlockchain({ message: 'Blockchain not supported' })
  blockchain: string;

  @IsAlphanumeric()
  address: string;
}

const mapToWallet = ({ address }: FindByWalletUseCaseDTO) => {
  const wallet = new Wallet();
  wallet.blockchain = Blockchain.NEAR;
  wallet.address = address;

  return wallet;
};

@Injectable()
class FindByWalletUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async doit(params: FindByWalletUseCaseDTO): Promise<User> {
    const wallet = mapToWallet(params);

    try {
      return await this.userRepository.findByWallet(wallet);
    } catch {
      throw new UserNotFoundError();
    }
  }
}

export { FindByWalletUseCase, FindByWalletUseCaseDTO };

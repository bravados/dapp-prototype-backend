import { Inject, Injectable } from '@nestjs/common';
import { Blockchain, Wallet } from '@contexts/wallets/wallet.entity';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import {
  IsAlphanumeric,
  IsSupportedBlockchain,
} from '@infrastructure/http/validators';

class GetUserDTO {
  @IsSupportedBlockchain({ message: 'Blockchain not supported' })
  blockchain: string;

  @IsAlphanumeric()
  address: string;
}

const mapToWallet = ({ address }: GetUserDTO) => {
  const wallet = new Wallet();
  wallet.blockchain = 'NEAR' as Blockchain;
  wallet.address = address;

  return wallet;
};

@Injectable()
class GetUserUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async doit(params: GetUserDTO): Promise<User | null> {
    const wallet = mapToWallet(params);

    return this.userRepository.findByWallet(wallet);
  }
}

export { GetUserUseCase, GetUserDTO };

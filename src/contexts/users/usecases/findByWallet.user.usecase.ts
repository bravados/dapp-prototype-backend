import { Inject, Injectable } from '@nestjs/common';
import { Blockchain, Wallet } from '@contexts/wallets/wallet.entity';
import { UnknownBlockchainError } from '@contexts/wallets/wallet.error';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import { UserNotFoundError } from '../user.error';

type FindByWalletUseCaseDTO = {
  blockchain: string;
  address: string;
};

const mapToWallet = ({ blockchain, address }: FindByWalletUseCaseDTO) => {
  const wallet = new Wallet();

  if (blockchain != Blockchain.NEAR) throw new UnknownBlockchainError();

  wallet.blockchain = blockchain;
  wallet.address = address;

  return wallet;
};

@Injectable()
class FindByWalletUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async do(params: FindByWalletUseCaseDTO): Promise<User> {
    const wallet = mapToWallet(params);

    try {
      return await this.userRepository.findByWallet(wallet);
    } catch {
      throw new UserNotFoundError();
    }
  }
}

export { FindByWalletUseCase };

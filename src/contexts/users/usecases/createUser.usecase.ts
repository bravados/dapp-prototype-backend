import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@infrastructure/usecases';
import { Blockchain } from '@contexts/wallets/wallet.entity';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import {
  IsNotEmpty,
  IsSupportedBlockchain,
} from '@infrastructure/http/validators';

class CreateUserDTO {
  @IsSupportedBlockchain({ message: 'Blockchain not supported' })
  blockchain: string;

  @IsNotEmpty()
  address: string;
}

@Injectable()
class CreateUserUseCase implements UseCase<User> {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  doit(params: CreateUserDTO): Promise<User> {
    return this.userRepository.create({
      name: `${params.address}`,
      type: 'INDIVIDUAL',
      wallets: [
        {
          blockchain: params.blockchain.toUpperCase() as Blockchain,
          address: params.address,
        },
      ],
      royalties: [],
      nfts: [],
    });
  }
}

export { CreateUserUseCase, CreateUserDTO };

import { User } from '@contexts/users/user.entity';
import { Entity } from '@infrastructure/database/entity';

enum Blockchain {
  NEAR = 'NEAR',
}

class Wallet extends Entity {
  blockchain: Blockchain;
  address: string;
  user: User;
}

export { Wallet, Blockchain };

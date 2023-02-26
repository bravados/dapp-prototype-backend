import { User } from '@contexts/users/user.entity';
import { Entity } from '@infrastructure/database/entity';

type Blockchain = 'NEAR';

class Wallet extends Entity {
  blockchain: Blockchain;
  address: string;
  user: User;
}

export { Wallet };
export type { Blockchain };

import { Entity } from '@infrastructure/database/entity';
import { Wallet } from '@contexts/wallets/wallet.entity';

type UserType = 'ARTIST' | 'INDIVIDUAL' | 'ADMIN';

class User extends Entity {
  name: string;
  email: string;
  avatar: string;
  type: UserType;
  wallets: Omit<Wallet, 'user'>[];
}

export { User };
export type { UserType };

import { Entity } from '@infrastructure/database/entity';
import { Wallet } from '@contexts/wallets/wallet.entity';

type UserType = 'ARTIST' | 'INDIVIDUAL' | 'ADMIN';

class User extends Entity {
  name: string;
  email?: string | null;
  avatar?: string | null;
  type: UserType;
  wallets: Omit<Wallet, 'user'>[];
}

export { User };
export type { UserType };

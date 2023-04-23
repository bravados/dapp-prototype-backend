import { Entity } from '@infrastructure/database/entity';
import { Wallet } from '@contexts/wallets/wallet.entity';
import { Nft } from '@contexts/nfts/nft.entity';

type UserType = 'ARTIST' | 'INDIVIDUAL' | 'ADMIN';

class Royalty {
  user: User;
  wallet: Wallet;
  percent: number;
}

class BasicUser extends Entity {
  name: string;
  email?: string | null;
  avatar?: string | null;
  type: UserType;
}

class User extends BasicUser {
  wallets: Omit<Wallet, 'user'>[];
  royalties: Omit<Royalty, 'user'>[];
  nfts: Nft[];
}

export { BasicUser, User, Royalty };
export type { UserType };

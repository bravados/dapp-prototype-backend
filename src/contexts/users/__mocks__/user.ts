import { Blockchain, Wallet } from '@contexts/wallets/wallet.entity';
import { BasicUser, Royalty, User, UserType } from '../user.entity';

const basicUser = {
  name: 'Misty',
  email: 'misty@pokemon.com',
  avatar: 'https://some.path',
  type: 'INDIVIDUAL' as UserType,
} as BasicUser;

const user = {
  name: 'Ash',
  email: 'Ash@kirunalabs.io',
  avatar: 'https://some.path',
  type: 'ADMIN' as UserType,
  wallets: [
    {
      blockchain: 'NEAR' as Blockchain,
      address: 'ashketchum.near',
    },
  ],
  royalties: [
    {
      wallet: {
        blockchain: 'NEAR' as Blockchain,
        address: 'misty.near',
        user: basicUser,
      } as Wallet,
      percent: 10,
    } as Royalty,
  ],
} as User;

export { basicUser, user };

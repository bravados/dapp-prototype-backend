import { Blockchain } from '@contexts/wallets/wallet.entity';
import { UserType } from '../user.entity';

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
};

export { user };

import { user } from '@contexts/users/__mocks__/user';
import { Blockchain } from '../wallet.entity';

const wallet = {
  blockchain: 'NEAR' as Blockchain,
  address: 'ashketchum.near',
  user,
};

export { wallet };

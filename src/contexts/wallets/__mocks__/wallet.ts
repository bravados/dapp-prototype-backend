import { user as userMock } from '@contexts/users/__mocks__/user';
import { Blockchain } from '../wallet.entity';

const wallet = {
  id: 130,
  blockchain: Blockchain.NEAR,
  address: 'ashketchum.near',
  user: userMock,
};

export { wallet };

import { BasicUser, User } from '@contexts/users/user.entity';
import { Blockchain } from '@contexts/wallets/wallet.entity';

type IPFSFile = {
  cid: string;
};

class Nft {
  id: string;
  title: Maybe<string>;
  description: Maybe<string>;
  media: string;
  creator: BasicUser;
  blockchain: Blockchain;
}

export { IPFSFile, Nft };

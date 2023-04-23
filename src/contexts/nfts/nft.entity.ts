import { Blockchain } from '@contexts/wallets/wallet.entity';

type IPFSFile = {
  cid: string;
};

class Nft {
  id: string;
  title: Maybe<string>;
  description: Maybe<string>;
  media: string;
  creator: { id: number };
  blockchain: Blockchain;
}

export { IPFSFile, Nft };

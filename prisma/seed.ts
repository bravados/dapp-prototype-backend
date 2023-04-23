import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@crystalcastles.com' },
    update: {},
    create: {
      email: 'alice@crystalcastles.com',
      name: 'Alice Glass',
      type: 'INDIVIDUAL',
      avatar: 'avatar-path-20230226',
      wallets: {
        create: [
          {
            blockchain: 'NEAR',
            address: '123',
          },
        ],
      },
    },
  });
  console.log({ alice });

  const bravado = await prisma.user.upsert({
    where: { email: 'bravado@me.com' },
    update: {},
    create: {
      email: 'bravado@me.com',
      name: 'Bravado',
      type: 'ARTIST',
      avatar: 'avatar-path-20230416',
      wallets: {
        create: [
          {
            blockchain: 'NEAR',
            address: 'bravado.testnet',
          },
        ],
      },
    },
  });
  console.log({ bravado });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

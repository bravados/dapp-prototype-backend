import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@crystalcastles.com' },
    update: {},
    create: {
      email: 'alice@crystalcastles.com',
      name: 'Alice Glass',
      type: 'ADMIN',
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

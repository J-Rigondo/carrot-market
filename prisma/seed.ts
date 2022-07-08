import { PrismaClient } from '@prisma/client';
import { log } from 'util';

const client = new PrismaClient();

async function main() {
  for (const item of [...Array.from(Array(500).keys())]) {
    const stream = await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 25,
          },
        },
      },
    });
    console.log(`${item}/500`);
  }
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());

import { PrismaClient } from '@prisma/client';
import { log } from 'util';

const client = new PrismaClient();

async function main() {}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());

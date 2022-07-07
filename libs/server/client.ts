import { PrismaClient, Prisma } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}

const client =
  global.client ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });

if (process.env.NODE_ENV === 'development') {
  global.client = client;
}

client.$on('query' as any, (e: any) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

export default client;

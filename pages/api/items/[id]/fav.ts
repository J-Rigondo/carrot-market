import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withSession } from 'libs/server/withSession';

interface IResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>,
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyFavorite = await client.fav.findFirst({
    where: {
      productId: +id,
      userId: user?.id,
    },
  });

  if (alreadyFavorite) {
    await client.fav.delete({
      where: {
        id: alreadyFavorite.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id,
          },
        },
      },
    });
  }

  res.json({ ok: true });
}

export default withSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);

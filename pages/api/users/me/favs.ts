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
    session: { user },
  } = req;

  const favs = await client.fav.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    favs,
  });
}

export default withSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);

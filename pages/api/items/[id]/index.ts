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

  const item = await client.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const terms = item?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedItems = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: +id,
        },
      },
    },
  });

  console.log(relatedItems);

  const isLiked = await client.fav.findFirst({
    where: {
      userId: user?.id,
      productId: +id,
    },
  });

  console.log(isLiked);

  res.json({ ok: true, item, relatedItems, isLiked: isLiked ? true : false });
}

export default withSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);

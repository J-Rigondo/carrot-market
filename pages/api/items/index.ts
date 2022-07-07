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
    body: { name, price, description },
    session: { user },
  } = req;

  if (req.method === 'GET') {
    const items = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      items,
    });
  }

  if (req.method === 'POST') {
    let item;
    try {
      item = await client.product.create({
        data: {
          name,
          price: +price,
          description,
          imageUrl: 'ee',
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
    }

    res.json({
      ok: true,
      item,
    });
  }
}

export default withSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
  }),
);

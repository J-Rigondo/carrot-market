import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withSession } from 'libs/server/withSession';
import { algorithms } from '@hapi/iron';

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
    body: { name, price, description },
  } = req;

  if (req.method === 'GET') {
    const streams = await client.stream.findMany({
      skip: 10,
      take: 10,
    });

    res.json({
      ok: true,
      streams,
    });
  }
  if (req.method === 'POST') {
    let stream;

    try {
      stream = await client.stream.create({
        data: {
          name,
          price: +price,
          description,
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
      stream,
    });
  }
}

export default withSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);

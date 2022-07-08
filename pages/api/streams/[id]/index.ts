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
    query: { id },
  } = req;

  const stream = await client.stream.findUnique({
    where: {
      id: +id,
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    stream,
  });
}

export default withSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);

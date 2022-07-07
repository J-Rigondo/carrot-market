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
    body: { message },
  } = req;

  const findMessage = await client.message.create({
    data: {
      message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      stream: {
        connect: {
          id: +id,
        },
      },
    },
  });

  res.json({
    ok: true,
    findMessage,
  });
}

export default withSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);

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
    query: { id },
  } = req;

  const findStreamUser = await client.stream.findUnique({
    where: {
      id: +id,
    },
    select: {
      userId: true,
    },
  });

  const isOwner = findStreamUser?.userId === user?.id;

  let stream;

  try {
    stream = await client.stream.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        name: true,
        description: true,
        price: true,
        cloudflareId: isOwner,
        cloudflareUrl: isOwner,
        cloudflareKey: isOwner,
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
  } catch (e) {
    console.log(e);
  }

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

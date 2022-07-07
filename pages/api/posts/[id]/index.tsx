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

  const post = await client.post.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      answers: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          answer: true,
        },
      },
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });

  const isWondering = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +id,
    },
  });

  res.json({
    ok: true,
    post,
    isWondering: !!isWondering,
  });
}

export default withSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);

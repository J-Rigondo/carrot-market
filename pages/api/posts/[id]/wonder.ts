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

  const alreadyExists = await client.wondering.findFirst({
    where: {
      postId: +id,
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });

  if (alreadyExists) {
    await client.wondering.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id,
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);

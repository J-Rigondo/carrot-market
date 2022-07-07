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
    body: { question, latitude, longitude },
    query,
  } = req;

  if (req.method === 'GET') {
    const posts = await client.post.findMany({
      where: {
        latitude: {
          gte: +query.latitude - 0.01,
          lte: +query.latitude + 0.01,
        },
        longitude: {
          gte: +query.longitude - 0.01,
          lte: +query.longitude + 0.01,
        },
      },
      include: {
        user: {
          select: {
            name: true,
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

    res.json({
      ok: true,
      posts,
    });
  }

  if (req.method === 'POST') {
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      post,
    });
  }
}

export default withSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
  }),
);

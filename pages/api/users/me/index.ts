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
    body: { email, phone },
  } = req;

  if (req.method === 'GET') {
    const profile = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    res.json({
      ok: true,
      profile,
    });
  }

  if (req.method === 'POST') {
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (email && email !== currentUser?.email) {
      const findId = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (findId) {
        return res.json({
          ok: false,
          error: '이미 사용중인 이메일입니다.',
        });
      }

      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });

      res.json({ ok: true });
    }
    if (phone && phone !== currentUser?.phone) {
      const findId = await client.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      });

      if (findId) {
        return res.json({
          ok: false,
          error: '이미 사용중인 번호입니다.',
        });
      }

      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });

      res.json({ ok: true });
    }

    res.json({
      ok: true,
      message: 'nothing update',
    });
  }
}

export default withSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);

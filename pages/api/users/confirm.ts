import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withIronSessionApiRoute } from 'iron-session/next';
import { withSession } from 'libs/server/withSession';

interface IResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>,
) {
  const { token } = req.body;
  const findToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: {
      user: true,
    },
  });

  console.log('ftoken', findToken);

  if (!findToken) {
    res.status(404).end();
    return;
  }

  req.session.user = {
    id: findToken.userId,
  };

  console.log(req.session);

  try {
    await req.session.save();
  } catch (e) {
    console.log(e);
  }

  await client.token.deleteMany({
    where: {
      userId: findToken.userId,
    },
  });

  res.json({ ok: true });
}

export default withSession(
  withHandler({
    method: 'POST',
    handler,
    isPrivate: false,
  }),
);

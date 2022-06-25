import { NextApiRequest, NextApiResponse } from 'next';
import client from 'libs/server/client';
import withHandler from 'libs/server/withHandler';
import { v4 as uuidv4 } from 'uuid';

interface IResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>,
) {
  const { email, phone } = req.body;
  const type = phone ? { phone: +phone } : email ? { email } : null;

  if (!type) {
    return res.status(400).json({ ok: false });
  }

  const token = await client.token.create({
    data: {
      payload: uuidv4(),
      user: {
        connectOrCreate: {
          create: {
            name: 'tester',
            ...type,
          },
          where: {
            ...type,
          },
        },
      },
    },
  });

  console.log(token);

  return res.json({ ok: true });
}

export default withHandler('POST', handler);

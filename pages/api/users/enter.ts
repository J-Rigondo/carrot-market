import { NextApiRequest, NextApiResponse } from 'next';
import client from 'libs/server/client';
import withHandler from 'libs/server/withHandler';
import { v4 as uuidv4 } from 'uuid';
import twilio from 'twilio';

interface IResponseType {
  ok: boolean;
  [key: string]: any;
}

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN, {
  logLevel: 'debug',
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>,
) {
  const { email, phone } = req.body;
  const type = phone ? { phone } : email ? { email } : null;

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

  // if (phone) {
  //   await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MESSAGE_SID,
  //     to: process.env.PHONE!,
  //     body: `로그인 토큰입니다.\n${token}`,
  //   });
  // }

  return res.json({ ok: true });
}

export default withHandler({
  methods: ['POST'],
  handler,
  isPrivate: false,
});

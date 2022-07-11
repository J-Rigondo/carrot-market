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
    body: { name, price, description },
  } = req;

  if (req.method === 'GET') {
    const streams = await client.stream.findMany();

    res.json({
      ok: true,
      streams,
    });
  }
  if (req.method === 'POST') {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/stream/live_inputs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN}`,
          body: '{"meta": {"name":"test stream 1"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}',
        },
      },
    );
    console.log(response);

    const {
      result: {
        uid,
        rtmps: { url, streamKey },
      },
    } = await response.json();
    console.log(uid, url, streamKey);

    let stream;

    try {
      stream = await client.stream.create({
        data: {
          cloudflareKey: streamKey,
          cloudflareId: uid,
          cloudflareUrl: url,
          name,
          price: +price,
          description,
          user: {
            connect: {
              id: user?.id,
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
}

export default withSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);

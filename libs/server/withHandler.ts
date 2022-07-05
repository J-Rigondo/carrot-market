import { NextApiRequest, NextApiResponse } from 'next';

interface IConfig {
  method: 'GET' | 'POST' | 'DELETE';
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler(config: IConfig) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<any> {
    const { method, handler, isPrivate = true } = config;

    if (req.method !== method) {
      return res.status(405).end();
    }

    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, message: 'please login' });
    }

    try {
      await handler(req, res);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  };
}

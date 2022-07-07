import { NextApiRequest, NextApiResponse } from 'next';

type method = 'GET' | 'POST' | 'DELETE';

interface IConfig {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler(config: IConfig) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<any> {
    const { methods, handler, isPrivate = true } = config;

    if (req.method && !methods.includes(req.method as any)) {
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

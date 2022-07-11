import type { NextRequest, NextFetchEvent } from 'next/server';

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  console.log('global middleware');
  console.log(req.ua);
  console.log(event);

  console.log(req.cookies);

  if (req.ua?.isBot) {
    return new Response('dont be a bot.');
  }
}

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge'
};

export default async function handler(request: Request) {
  return new ImageResponse((

  ), {
    width: 64,
    height: 64,
  });
}

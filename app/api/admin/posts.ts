// pages/api/admin/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
// import your DB client here
// import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, slug, category, content, keywords, metaDesc } = req.body;
    // Example using Prisma:
    // const post = await prisma.post.create({ data:{ title, slug, category, content, keywords:keywords.split(','), metaDesc } });
    // res.status(201).json(post);
    res.status(201).json({ ok: true }); // stub
  } else if (req.method === 'GET') {
    // list posts…
    res.status(200).json([]);
  } else {
    res.setHeader('Allow', ['GET','POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

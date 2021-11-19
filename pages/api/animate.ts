/**
 * @author metajs
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { animateFilter } from 'animate-metainfo-parser-cn';
import axios from 'axios';

export default async function AnimateTransformer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query as { url: string };
  const feedContent = await axios.get(url);
  res.status(200).end(animateFilter(feedContent.data));
}

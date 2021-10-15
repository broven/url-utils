import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import convert from 'xml-js';

/**
 * pass the CORS policy
 */
export default async function AnimateTransformer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query as { url: string };
  const data = await axios.get(url);
  const parsedFeed:any = convert.xml2js(data.data, { compact: true});
  res.status(200).end(convert.js2xml(parsedFeed, {compact: true, spaces: 4}));
}
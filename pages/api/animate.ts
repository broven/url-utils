/**
 * @author metajs
 */
import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import convert from 'xml-js';

const isTraditionalChinese = (text: string) => {
    switch(true) {
        case text.indexOf('BIG5') !== -1:
        case text.indexOf('CHT') !== -1:
            return true;
        default:
            return false;
    }
}
const isSeasonPack = (title: string) => {
    switch(true) {
        case title.indexOf('【合集】') !== -1:
            return true;
        default:
            return false;
    }
}
export const animateFilter = (content: string) => {
  const parsedFeed:any = convert.xml2js(content, { compact: true});
  parsedFeed.rss.channel.item = parsedFeed.rss.channel.item.map((item: any) => {
    const title = item.title._text;
    if (isSeasonPack(title)) return null;
    if (isTraditionalChinese(title)) return null;
   return item;
  }).filter((i: any) => i !== null);
  return convert.js2xml(parsedFeed, {compact: true, spaces: 4});
}





export default async function AnimateTransformer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query as { url: string };
  const feedContent = await axios.get(url);
  res.status(200).end(animateFilter(feedContent.data));
}
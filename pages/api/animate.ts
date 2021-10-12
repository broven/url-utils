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
export default async function AnimateTransformer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url }: { url: string } = req.query;
  const feedContent = await axios.get(url);
  const parsedFeed = convert.xml2js(feedContent.data, { compact: false });
  const root = parsedFeed.elements[0].elements;
  console.log(root);
  root[0].elements = root[0].elements.map(ele => {
      if (ele.name !== 'item') return ele;
      // 过滤繁体中文
      const feedItemInfo = new RssFeedItem(ele);
      if (isTraditionalChinese(feedItemInfo.title)) {
          return null;
      }
      // 过滤合集
      if(isSeasonPack(feedItemInfo.title)) {
          return null;
      }
      return ele;
  }).filter(ele => ele !== null);
  console.log(root);
  // 针对同一集多个分辨率进行去重
  res.status(200).end(convert.js2xml(parsedFeed, { compact: false}))

}


class RssFeedItem {
    _raw: any;
    constructor(element:any) {
        this._raw = element;
    }
    byName(name: string) {
        return this._raw.elements.find(ele => ele.name === name);
    }
    get title() {
        return this.byName('title').elements[0].text;
    }
}
import { animateFilter } from '@api/animate'
import fs from 'fs';
// https://mikanani.me/
// TODO: axios jest找不到， 看看解决方案
test('幻樱字幕组', () => {
    const content = fs.readFileSync('./data/幻樱字幕组.rss');
    const result = animateFilter(content.toString());
    expect(result).toMatchSnapshot();
});
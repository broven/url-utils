import { animateFilter } from '@api/animate'
import fs from 'fs';
// https://mikanani.me/
// TODO: axios jest找不到， 看看解决方案
describe('幻樱字幕组', () => {
    // test('幻樱字幕组', () => {
    //     const content = fs.readFileSync('test/animte/data/幻樱字幕组.rss');
    //     const result = animateFilter(content.toString());
    //     expect(result).toMatchSnapshot();
    // });
    test('合集', () => {
        const content = fs.readFileSync('test/animte/data/collection.rss');
        const result = animateFilter(content.toString());
        expect(result).toMatchSnapshot();
    });
    test('语言过滤', () => {
        const content = fs.readFileSync('test/animte/data/language.rss');
        const result = animateFilter(content.toString());
        expect(result).toMatchSnapshot();
    });
    // test('单集多分辨率', () => {
    //     const content = fs.readFileSync('test/animte/data/uni.rss');
    //     const result = animateFilter(content.toString());
    //     expect(result).toMatchSnapshot();
    // });

})
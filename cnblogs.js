/**
 * Created by Administrator on 2018/2/20.
 */
const fetch = require('./Module/fetch');
const cheerio = require('cheerio');//爬虫抓取
const fs = require('fs');
const path = require('path');

const savePath = path.join(__dirname, './Module/posts');

//案例 --抓取页面的内容
if (!fs.existsSync(savePath))
    fs.mkdirSync(savePath);

// const storage = {};

// 利用node做一个客户端 请求m.baidu.com
fetch('https://www.cnblogs.com/', (err, content) => {

     //console.log(content);

    const $ = cheerio.load(content);

    var aLinks = $('.titlelnk');
    //console.log(aLinks);
    var taskCount = aLinks.length;
    //console.log(taskCount);
    aLinks.each((i, item) => {
    //console.log(item);
        fetch(item.attribs.href, (err, content) => {
            //console.log(i+"  "+content);//连接过去的一个网页的整个内容
            taskCount--;

            const $$ = cheerio.load(content);
            var body = $$('#cnblogs_post_body').html();
            var filename = item.children[0].data.replace('/', '-').replace('\\', '-') + '.html';
            //console.log(filename);
            fs.writeFile(path.join(savePath, filename), body);
            //storage[item.children[0].data] = body;
            //if (!taskCount) {
            //    // 当前是最后一次任务
            //    console.log(storage);
            //}
        });
    });

});

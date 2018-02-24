/**
 * Created by Administrator on 2018/2/20.
 */
const fetch = require('./Module/fetch');
const cheerio = require('cheerio');//����ץȡ
const fs = require('fs');
const path = require('path');

const savePath = path.join(__dirname, './Module/posts');

//���� --ץȡҳ�������
if (!fs.existsSync(savePath))
    fs.mkdirSync(savePath);

// const storage = {};

// ����node��һ���ͻ��� ����m.baidu.com
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
            //console.log(i+"  "+content);//���ӹ�ȥ��һ����ҳ����������
            taskCount--;

            const $$ = cheerio.load(content);
            var body = $$('#cnblogs_post_body').html();
            var filename = item.children[0].data.replace('/', '-').replace('\\', '-') + '.html';
            //console.log(filename);
            fs.writeFile(path.join(savePath, filename), body);
            //storage[item.children[0].data] = body;
            //if (!taskCount) {
            //    // ��ǰ�����һ������
            //    console.log(storage);
            //}
        });
    });

});

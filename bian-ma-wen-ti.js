/**
 * Created by Administrator on 2018/2/13.
 */
////案例 读取图片 ：较大文件读取过来都是buffer对象
//const fs=require('fs');
//const path=require('path');
////fs.readFile(path.join(__dirname,'./FileTest/star.jpg'),(error,data)=>{
////    if(error) throw error;
////   //console.log(data);
////    //被64位编码的正文  千万不能用utf-8,因为他不是文本而是图片，需要采用64位编码
////    //生成的是64位的编码格式，可以用data:image/jpg;base64,加编码 在浏览器中打开
////    console.log(data.toString('base64'));
////})
//
////字符串也可以转化为64位编码
//var buf=new Buffer('hello world','utf-8');
//console.log(buf.toString('base64'));//一般最后一个是’=‘都是64位的编码吗

//总结 编码的格式不是很多
//1.ASCII码表  2.utf-8  3.utf-16le  4.ucs2  5.base64  6.binary(exe读成2进制)  7.hex




////文件编码的问题   其实windows的默认编码都是GBK的编码格式
//const fs=require('fs');
//const path=require('path');
////对于Node编码的问题,node本身是没有办法解决的，一般采用第三方编码的插件iconv-lite
////解决字符编码的转换问题
//const iconv=require('iconv-lite');
////readFile的方式确实是使用了Buffer,但是也是一次性读取
//fs.readFile(path.join(__dirname,'./FileTest','./love.lrc'),(error,data)=>{
//        if(error) throw error;
//        console.log(data);
//        console.log('+++++++++++++++++++++++++++++++++++++++++++++');
//        console.log(data.toString());//如果不传编码 默认就是utf-8
//        console.log('+++++++++++++++++++++++++++++++++++++++++++++');
//        //console.log(data.toString('GBK'));//在node中不支持GBK编码
//        console.log('+++++++++++++++++++++++++++++++++++++++++++++');
//        console.log(iconv.decode(data,'gbk'));//采用插件输出gbk编码格式
//    }
//);



//案例 动态歌词滚动
const fs=require('fs');
const path=require('path');
const iconv=require('iconv-lite');
fs.readFile(path.join(__dirname,'./FileTest','./love.lrc'),(error,data)=>{
        if(error) throw error;
        //console.log(iconv.decode(data,'gbk'));//采用插件输出gbk编码格式
        var lines=iconv.decode(data,'gbk').split('\n');//以换行切割成数组
        //console.log(line.length);
        // [03:27.683]人总要学着自己长大
        var reg=/\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
        var begin=new Date().getTime();
        //遍历
            lines.forEach((line)=>{
                    //console.log(reg.test(line));
                    var matches=reg.exec(line);
                 if(matches){
                      var m=parseInt(matches[1]);
                      var s=parseInt(matches[2]);
                      var f=parseInt(matches[3]);
                      var lyric=matches[4];
                      //当前行不是立即执行的
                      //console.log(new Date().getTime());
                      //由于输出任务的时间不一样  主要是代码的执行需要一定的时间所以会有一定的毫秒
                      //所以需要减去这个毫秒差offset
                       var offset=new Date().getTime()-begin;//毫秒差
                         setTimeout(()=>{
                             console.log(lyric);
                       },m*60*1000+s*1000+f-offset);
                 }else{
                     //不是一行歌词
                    console.log(line)
                 }

            })
    }
);











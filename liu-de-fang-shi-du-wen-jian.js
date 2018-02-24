/**
 * Created by Administrator on 2018/2/13.
 */
//案例 动态歌词滚动----readFile读取文件内容
//const fs=require('fs');
//const path=require('path');
//const iconv=require('iconv-lite');
//fs.readFile(path.join(__dirname,'./FileTest','./love.lrc'),(error,data)=>{
//        if(error) throw error;
//        //console.log(iconv.decode(data,'gbk'));//采用插件输出gbk编码格式
//        var lines=iconv.decode(data,'gbk').split('\n');//以换行切割成数组
//        //console.log(line.length);
//        // [03:27.683]人总要学着自己长大
//        var reg=/\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
//        var begin=new Date().getTime();
//        //遍历
//        lines.forEach((line)=>{
//            //console.log(reg.test(line));
//            var matches=reg.exec(line);
//            if(matches){
//                var m=parseInt(matches[1]);
//                var s=parseInt(matches[2]);
//                var f=parseInt(matches[3]);
//                var lyric=matches[4];
//                //当前行不是立即执行的
//                //console.log(new Date().getTime());
//                //由于输出任务的时间不一样  主要是代码的执行需要一定的时间所以会有一定的毫秒
//                //所以需要减去这个毫秒差offset
//                var offset=new Date().getTime()-begin;//毫秒差
//                setTimeout(()=>{
//                    console.log(lyric);
//                },m*60*1000+s*1000+f-offset);
//            }else{
//                //不是一行歌词
//                console.log(line)
//            }
//
//        })
//    }
//);



//下面是一个简单的文件流的读取方式

//const fs=require('fs');
//const path=require('path');
//const iconv=require('iconv-lite');
//var filename=path.join(__dirname,'./FileTest/love.lrc');
//var streamReader=fs.createReadStream(filename)
//    .pipe(iconv.decodeStream('gbk'));
//var data='';
//streamReader.on('data',(chunk)=>{
//     //chunk只是文档的一个片段，也就是一部分 不完整
//     data+=chunk.toString();
//});
//streamReader.on('end',()=>{
//     //通知已经结束了文档的读取  此时data是一个完整的文档
//        console.log(data);
//});


//案例  采用readline的方式一行一行的读取歌词 node内置的API
/* 注意:与上面的方法不同的是 上面的会将文件一次性读取到内存中然后由我们写的代码一次性去对文件
 的内容操作，内存如果太小，文件太大会出现卡顿，并且读取完整的文件到内存中也会消耗大量的时间
 但是下面的这种方法是采用流的方式，就是比如在内存中开辟1024个字节流的Buffer空间大小，
 然后将文件的一小部分读取到这个Buffer中，再由我们的代码去读取Buffer中的文件内容,实现了
 一个缓冲的作用。
 *
 * */
const fs=require('fs');
const path=require('path');
const iconv=require('iconv-lite');
const readline=require('readline');
var filename=path.join(__dirname,'./FileTest/love.lrc');
//以流的方式读取文件内容
var streamReader=fs.createReadStream(filename)
    .pipe(iconv.decodeStream('gbk'));//gbk转码
//利用readline一行一行读取 streamReader
var rl=readline.createInterface({input:streamReader});
// [03:27.683]人总要学着自己长大 =>定义正则
var reg=/\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
//读取文件内容的开始时间
var begin=new Date().getTime();
rl.on('line',(line)=>{
    //console.log(typeof line);//string  读出来的流是一个string
    task(line,begin);
});
//将单行每隔多少秒输出歌词封装成一个行数task
function task(line,begin){
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
}

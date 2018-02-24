/**
 * Created by Administrator on 2018/2/15.
 */
//大文件的复制
//const fs=require('fs');
//const path=require('path');

//fs.readFile('E:\\wplayer.exe',(error,data)=>{
//    if(error){
//        throw error;
//    }
//    //console.log(data);
//    fs.writeFile('F:\\Node\\FileTest\\wplayer.exe',data,(error)=>{
//        if(error){
//            throw error;
//        }
//        console.log('文件拷贝成功');
//    });
//});




//注意 以上方式大文件的拷贝内存受不了  没有进度的概念
//将磁盘的文件读取到内存中 只是将文件的一个副本读取到内存中

//下面以文件流的方式   提供一个第三的水票进行两边的来回操作
//const fs=require('fs');
//const path=require('path');
////创建文件的读取流 并没有读出正式的数据 开始了读取文件的任务
//var reader=fs.createReadStream('E:\\wplayer.exe');
////创建一个写入的流
//var writer=fs.createWriteStream('F:\\Node\\FileTest\\wplayer.exe')
////然后判断磁盘上这个文件是否存在
//fs.stat('E:\\wplayer.exe',(error,stats)=>{
//    if(stats){
//        //记录当前读了多少数据
//        var readTotal=0;
//        reader.on('data',(chunk)=>{//这chunk是一个二进制的  Buffer
//            //chunk 是一个buffer(字节数组) 有一个length属性
//            console.log('读了一部分数据：'+chunk.length);//65536
//            writer.write(chunk,(error)=>{
//                if(error) throw error;
//                //文件总的大小16109kb 1kb=1024b ===>stats.size
//                console.log('写的进度：'+(((readTotal+=chunk.length)/stats.size*100)).toFixed(2)+'%');
//            });
//
//        });
//    }
//});


//通过一个pipe的方法 就是相当于二者之间加了一个管道
const fs=require('fs');
const path=require('path');
//创建文件的读取流 并没有读出正式的数据 开始了读取文件的任务
var reader=fs.createReadStream('E:\\wplayer.exe');
//创建一个写入的流
var writer=fs.createWriteStream('F:\\Node\\FileTest\\wplayer.exe');
var writer2=fs.createWriteStream('F:\\Node\\FileTest\\wplayer.exe');
//读取流  ====   写入流
reader.pipe(writer);
reader.pipe(writer2);
//writer.on('pipe',(src)=>{
//    console.log(src===reader);//true
//})






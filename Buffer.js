/**
 * Created by Administrator on 2018/2/9.
 */
////buffer 读取缓冲区的文件内容
//const fs=require('fs');
//const path=require('path');
//
//
////readFile的方式确实是使用了Buffer,但是也是一次性读取
//fs.readFile(path.join(__dirname,'./FileTest','./1.txt'),(error,data)=>{
//        if(error) throw error;
//        console.log(data);
//        console.log('+++++++++++++++++++++++++++++++++++++++++++++');
//        console.log(data.toString('utf-8'));
//    }
//);




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









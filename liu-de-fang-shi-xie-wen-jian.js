/**
 * Created by Administrator on 2018/2/13.
 */
//流的方式写入文件
const fs=require('fs');
const path=require('path');

//fs.writeFile()  异步写入文件
//JSON.stringify() Json的序列化
//JSON.parse()  反序列化
//把hello.txt文件写入FileTest文件夹中，并且给他添加一点内容
//fs.writeFile(path.join(__dirname,'./FileTest/hello.txt'),JSON.stringify({id:10}),(error)=>{
//    if(error){//文件写入失败
//    // 比如文件夹访问权限问题,文件夹找不到
//        console.log(error);
//    }else{
//        console.log('success');
//    }
//});




//fs.writeFileSync()   同步写入文件
//try{//需要用到try catch 判断写入错误  一般Java c c#比较多，异步有回调所以不予要try catch
//
//}catch(error){
//
//}




//fs.createWriteStream()  //创建一个写入的流  Stream:流
//var streamWriter=fs.createWriteStream(path.join(__dirname,'./FileTest/hello.txt'))
////每隔一秒 文件中加入一个hello world
//setInterval(()=>{
//    streamWriter.write('hello world写入文件',()=>{
//        console.log('+1');
//    });
//},1000);

//默认写入 会覆盖存在的文件




//fs.appendFile  异步追加  防止覆盖之前文件中的内容
fs.appendFile(path.join(__dirname,'./FileTest/hello.txt'),'hello world',(error)=>{
    if(error){//文件写入失败
    // 比如文件夹访问权限问题,文件夹找不到
        console.log(error);
    }else{
        console.log('success');
    }
});








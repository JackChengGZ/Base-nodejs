/**
 * Created by Administrator on 2018/2/9.
 */
//同步和异步的调用
const fs=require('fs');
const path=require('path');


console.time('同步sync');
try{
    var data=fs.readFileSync(path.join(__dirname,'./FileTest','./1.txt'),'utf-8');
    console.log(data);//如果没有utf-8,文本数据就是16进制的
}catch(error){
    throw error;
}
console.timeEnd('同步sync');



console.time('异步async');
console.log(path.join(__dirname,'./FileTest','./1.txt'));
fs.readFile(path.join(__dirname,'./FileTest','./1.txt'),'utf-8',(error,data)=>{
        if(error) throw error;
        console.log(data);
    }
);
console.timeEnd('异步async');

//读取文件时没有指定编码默认读取的是一个Buffer()缓冲区

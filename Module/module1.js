/**
 * Created by Administrator on 2018/2/7.
 */
//模块中的全局成员

//获取当前脚本所在路径
//console.log(__dirname);
////文件路径
//console.log(__filename);


const fs=require('fs');
//所有的文件操作都必须是绝对路径(物理路径)
fs.readFile(__dirname+'/1.txt','utf8',(error,content)=>{
    //console.log(error)
    //console.log(content.toString());//把内容用toString转换
    console.log(content);//给文件加一个utf-8的编码格式
});
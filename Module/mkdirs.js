/**
 * Created by Administrator on 2018/2/14.
 */
//创建层级目录
const fs=require('fs');
const path=require('path');
//创建文件 定义模块成员  导出模块成员  载入模块 使用模块

//版本1
//function mkdirs(pathName,callback){
//    //console.log('mkdirs');
//    //1.判断传入 的是否是一个绝对路径
//    //F:\Node\Module\demo2\demo3
//    pathName=path.isAbsolute(pathName)?pathName:path.join(__dirname,pathName);
//    //获取要创建的部分
//    //pathName=pathName.replace(__dirname,'');
//   var relativePath=path.relative(__dirname,pathName);
//    //console.log(relativePath);
//    var folders=relativePath.split(path.sep);
//    //console.log(folders);
//    try{
//        var pre='';
//        folders.forEach(folder=>{
//            //采用同步的方式 防止异步执行时间的不同导致 后面的文件夹先被创建
//            fs.mkdirSync(path.join(__dirname,pre,folder));
//            pre=path.join(pre,folder);//demo2
//        });
//        callback&&callback(null);
//    }catch(error){
//        callback&&callback(error);
//    }
//    //console.log(pathName)
//}

//版本2 修改__dirname在不同文件下指代的不同路径 版本1中的路径指代的是当前的mkdirs.js的__dirname路径
function mkdirs(pathName,callback){
    //module.parent 拿到的是调用我的对象
    //console.log(module.parent);
    var root=path.dirname(module.parent.filename);
    //console.log(root);//用root 来替换__dirname

    //console.log('mkdirs');
    //1.判断传入 的是否是一个绝对路径
    //F:\Node\Module\demo2\demo3
    pathName=path.isAbsolute(pathName)?pathName:path.join(root,pathName);
    //获取要创建的部分
    //pathName=pathName.replace(__dirname,'');
    var relativePath=path.relative(root,pathName);
    //console.log(relativePath);
    var folders=relativePath.split(path.sep);
    //console.log(folders);
    try{
        var pre='';
        folders.forEach(folder=>{
            try{
                //fs.existsSync  文件路径是否已存在  此API已经过时
                //如果不存在则报错  就是判断文件夹是否已经存在
                fs.statSync(path.join(root,pre,folder));
            }catch(error){
                //采用同步的方式 防止异步执行时间的不同导致 后面的文件夹先被创建
                fs.mkdirSync(path.join(root,pre,folder));
            }
            pre=path.join(pre,folder);//demo2
        });
        callback&&callback(null);
    }catch(error){
        callback&&callback(error);
    }
    //console.log(pathName)
}
module.exports=mkdirs;

//注意 windows平台下 文件夹嵌套太深会导致文件移不出来
gfdsgfdsgdf
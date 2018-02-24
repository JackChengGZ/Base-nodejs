/**
 * Created by Administrator on 2018/2/13.
 */
//其他文件操作的API

//案例  移动文件和重名
//const fs=require('fs');
//const path=require('path');
//var currentPath=path.join(__dirname,'./FileTest/hello.txt');
//var targetPath=path.join(__dirname,'./FileTest/hello1.txt');
//fs.rename(currentPath,targetPath,(error)=>{
//    if(error) console.log(error);
//});



//案例  -打印一个目录树
//const fs=require('fs');
//const path=require('path');
//
////获取当前有没有传入目标路径
//var target=path.join(__dirname,process.argv[2]||'./');
////获取当前路径下的所有文件
//fs.readdir(target,(error,files)=>{
//    //console.log(files);
//    files.forEach((file)=>{
//        //console.log(path.join(target,file));
//        fs.stat(path.join(target,file),(error,stats)=>{
//            console.log(`${stats.mtime.format('yyyy/MM/dd HH:mm')}\t${stats.size}\t${file}`);
//        })
//    })
//})



//案例 -递归打印目录树
//注意 这里要用同步的方式  异步会出现时间上的紊乱  文件的顺序不对
//const fs=require('fs');
//const path=require('path');
//const depth=1;
////获取当前有没有传入目标路径
//var target=path.join(__dirname,process.argv[2]||'./');
////写一个函数递归
//function load(target,depth){
//    //depth  1="| "
//    //depth  2="| | "
//    //这里并没有采用for循环的形式 而是采用数组的join方法
//    var prefix=new Array(depth).join("| ");
//    //console.log(prefix);
//    //获取当前路径下的所有文件 --同步获取
//    var dirinfos=fs.readdirSync(target);
//    //console.log(dirinfo);//是一个数组的形式
//    //创建一个文件 文件夹空数组
//    var dirs=[];
//    var files=[];
//    dirinfos.forEach((info)=>{
//        var stats=fs.statSync(path.join(target,info));
//        if(stats.isFile()){
//            files.push(info);
//        }else{
//            dirs.push(info);
//        }
//    });
//    //文件夹 遍历
//    dirs.forEach((dir)=>{
//        //当前是一个，目录文件夹  需要深入进去
//        console.log(`${prefix}|——${dir}`);
//        //再次调用load 实现递归
//        load(path.join(target,dir),depth+1);
//    });
//    //console.log('++++++++++++++++++++++++')
//    var count=files.length-1;
//    //文件 遍历
//    files.forEach((file)=>{
//        //如果count--===0的时候就是false  显示 "|_"
//        console.log(`${prefix}${count--?'|':'|_'}——${file}`);
//    });
//}
//load(target,depth);






//案例  --创建文件夹
//const fs=require('fs');
//const path=require('path');
////一次性创建单个文件夹
////fs.mkdir(path.join(__dirname,'demo'))
//
////一次性创建嵌套文件夹  下面的方式不可以 因为demo没有创建 无法去创建demo1
////fs.mkdir(path.join(__dirname,'demo/demo1'),(error)=>{
////    if(error){
////        console.log(error);
////    }
////})
////引入自己手写的一个创建嵌套文件夹的API
//const mkdirs=require('./Module/mkdirs');
////mkdirs('demo2/demo3');

////这种方式可以  下面的不可以可能是出现了一些bug 暂时没有解决
////之后跟新了mkdirs版本2  将__dirname修改为当前调用文件的路径就可以了
//mkdirs(path.join(__dirname,'./Module/demo2/demo3'),(error)=>{
//    if(error) console.log(error);
//});

//注意 ：通过自定义模块创建多层目录 解决上述的__dirname的问题  跟上面的情况一样
//const mkdirs=require('./Module/mkdirs');
//const path=require('path');
//mkdirs(path.join(__dirname,'f1/f2/f3'),(error)=>{
//    if(error) console.log(error);
//});







//案例  --监视文件变化  实现markdown文件的转换
/*
* 思路：
*   1.利用fs模块的文件监视功能监视指定MD文件
*   2.当文件发生变化后，借助marked包提供的markdown to html功能将改变后的MD文件转换为HTML
*   3.再将得到的HTML替换到模板中
*   4.最后利用BrowserSync模块实现浏览器自动刷新
* */

const fs=require('fs');
const path=require('path');
//这个第三方模块 是为了将.md文件转换为html文件
const marked=require('marked');
//这个是从npm 上下载的一个browser-sync模块 用于启动浏览器
const browserSync=require('browser-sync');


//接受需要转换的文件路径
//接受的文件路径有两种 1.就是监听当前文件'./qi-ta-wen-jian-cao-zuo-API.js'
//                   2.process.argv[2] 获取传入的文件路径
const target=path.join(__dirname,process.argv[2]||'./qi-ta-wen-jian-cao-zuo-API.js');
//console.log(target);
var template=`<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <style type="text/css">
    {{{styles}}}
    </style>
</head>
<body>
    <div class="vs">
        {{{content}}}
    </div>
</body>
</html>
`;
//采用这种方式是可以 达到文件的监视效果 但是有个缺点就是监视的反映有点慢
//下面的一个参数可以设置一下监听时间  监视文件变化  {interval:100} 100毫秒之后自动更新
fs.watchFile(target,{interval:100},(curr,prev)=>{
    //监听文件当前的状态和上一次的状态 通过文件的大小 但是不可以这么监听 如果只是修改 文件
    // 大小没有改变就不能更新
    //console.log(`current:${curr.size};previous:${prev.size}`);

    //首先需要判断文件有没有变化，如果文件的内容没有变化就没有必要更新
    if(curr.mtime===prev.mtime){
        return false;
    }
    //读取文件转换为新的HTML
    fs.readFile(target,'utf8',(error,content)=>{
        if(error){throw error;}
        //content是文件的内容 通过marked将内容转换为html文件
        var htmlContent=marked(content);
        fs.readFile(path.join(__dirname,'./Module/github.css'),'utf-8',(error,cssContent)=>{
            //console.log(html)
            htmlContent=template.replace('{{{content}}}',htmlContent).replace('{{{styles}}}',cssContent);

            //将当前转译成html的文件可以放在同级目录下 那就直接用上面的targetm ；也可以不放在  下面我把他放到FileTest中
            //注意下面的.js扩展名不能写死  需要动态的获取!!
            var newPath=path.join(__dirname,'./FileTest','./qi-ta-wen-jian-cao-zuo-API.js');//获取FileTest路径
            //console.log(newPath);//F:\Node\FileTest\qi-ta-wen-jian-cao-zuo-API.js  这是一个拼接的假路径


            var filename=newPath.replace(path.extname(target),'.html');
            //console.log(filename);//F:\Node\FileTest\qi-ta-wen-jian-cao-zuo-API.html
            var indexHTML=path.basename(filename);
            //console.log(path.basename(filename));//qi-ta-wen-jian-cao-zuo-API.html


            //通过browsersync创建一个文件服务器
            browserSync({
                notify:false,
                //浏览器不做提示
                server:path.dirname(newPath),
                //console.log(path.dirname(newPath));//F:\Node\FileTest  ==>转换为 localhost:3000
                index:indexHTML
                //这是启动的首页;
            });

            fs.writeFile(newPath.replace(path.extname(target),'.html'),htmlContent,'utf8',(error)=>{
                //if(error){throw error;}
                browserSync.reload(indexHTML);
                //console.log('update '+new Date());
            });
        });
    });
});













'use strict';

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(format) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "f+": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
};
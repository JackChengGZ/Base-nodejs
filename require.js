/**
 * Created by Administrator on 2018/2/8.
 */
'use strict'

//自己写一个$require函数  模拟node系统中默认提供的一个require函数
function $require(id){
    //1.先找到这个文件  如果文件不存在就报错

    //2.读取文件内容  内容是js代码
    const fs=require('fs');//读取文件
    //在这里使用的是readFileSync是一个同步的读取返回，否则readFile是没法返回一个值给变量接收
    //所有文件操作的路径必须使用绝对路径__dirname
    //const filename=__dirname+id;//换一种方式
    const path=require('path');//操作路径



    //需要加载的js文件的完整路径
    //F:\Node\require.js  --->filename的值
    const filename=path.join(__dirname,id);

    //把所在路径当前文件路径去掉
    //F:\Node  -->需要的值dirname
    const dirname=path.dirname(filename);

    //readFileSync将同步读取出来的文件的代码保存在code中 这会是一个阻塞的操作
    //一直会等到整个代码读取完成  他不会进入事件队列
    let code=fs.readFileSync(filename,'utf-8');


     //定义一个module.exports或者 exports数据容器 用容器去装模块导出的成员
    //3.执行代码 所要执行的代码 需要给他创造一个私有空间(就相当于把他放到一个匿名函数里面)
    let module={
        id:filename,
        exports:{}//暴露出来的成员
    };
    //其实下面这个部分可以不用写  只是把module.exports给了exports 做了一个快捷方式
    let exports=module.exports;
    code=`(function($require,module,exports,__dirname,__filename){
                ${code}
        })($require,module,exports,dirname,filename);`;
    //相当于下面的这段代码
    //code=`(function($require,module,exports,__dirname,__filename){
    //            function say(msg){
    //                console.log(msg);
    //            }
    //            module.exports={say};
    //    })($require,module,exports,dirname,filename)`;

    //注意 在Node本身不是采用eval 而是其他方式
    eval(code);//执行函数  会获取到module.exports={say}
    return module.exports;
    //4.返回值
}

//调用自己写的require函数
//var module4=$require('./Module/require1.js');
//module4.say('hello world');
//还可以在 module.js加入以下代码 也就是一层嵌套一层
//var module5=$require('./Module/require1.js');
//module.exports={
//    say:()=>{
//        return module5.say('world');
//    }
//}




//检测自己写的$require是否有模块的缓存  结果是没有的
setInterval(()=>{
    var date=$require('./Module/require-cache1.js');
    console.log(date.date.getTime());
},1000);
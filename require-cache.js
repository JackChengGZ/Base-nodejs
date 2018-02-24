/**
 * Created by Administrator on 2018/2/8.
 */
'use strict'
//模块的缓存   结果是有的缓存  而自己写的$require没有
//setInterval(()=>{
//    var date=require('./Module/require-cache1.js');
//    //console.log(date.getTime());
//},1000);



//如何实现缓存   把自己的$require增加一个缓存的功能$require.cache
function $require(id){
    const fs=require('fs');
    const path=require('path');
    const filename=path.join(__dirname,id);



    //实现缓存
    $require.cache=$require.cache||{};
    if($require.cache[filename]){
        return $require.cache[filename].exports;
    }
    console.log($require.cache)



    //没有缓存 第一次
    const dirname=path.dirname(filename);
    let code=fs.readFileSync(filename,'utf-8');
    let module={
        id:filename,
        exports:{}
    };
    let exports=module.exports;
    code=`(function($require,module,exports,__dirname,__filename){
                ${code}
        })($require,module,exports,dirname,filename);`;
    eval(code);
    return module.exports;
}





//如何删除缓存  一般不会手动去清除缓存  在数据上一般用到
//1.第一种方式：采用delete require.cache[key]
//采用系统的require函数请求
//var date=require('./Module/require-cache1.js');
//采用自己写的$require函数请求
var date=$require('./Module/require-cache1.js');
setInterval(()=>{

   //采用delete require.cache[key]清除缓存
   // Object.keys(require.cache).forEach((key)=>{
   //     //Object.keys(require.cache) === > ["id", "exports", "parent", "filename", "loaded", "children", "paths"]
   //     delete require.cache[key];
   // })

    //最好不要讲require写在里面 因为每次去执行自己的$require函数会重新执行一次，这样就不会有缓存
   // var date=require('./Module/require-cache1.js');
    console.log(date.getTime());
    //当模块返回的时候是一个方法或者函数的时候
    //console.log(date().getTime());
    //console.log(require.cache);
},1000);

//console.log(require.cache);
//{ 'F:\Node\require-cache.js':
//    Module {
//    id: '.',
//        exports: {},
//    parent: null,
//        filename: 'F:\\Node\\require-cache.js',
//        loaded: false,
//        children: [],
//        paths: [ 'F:\\Node\\node_modules', 'F:\\node_modules' ] } }

//2.第二种方式就是在定义模块中采用函数或方法的写法,这种方式比较多
// 这样方法每次调用的时候回去执行一次 具体在模块中体现
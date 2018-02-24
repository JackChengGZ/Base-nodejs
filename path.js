/**
 * Created by Administrator on 2018/2/9.
 */
//path 模块的使用
const path=require('path');
console.log(__dirname);//F:\Node
const temp=path.join(__dirname,'./FileTest/love.lrc');


//path.basename(path[, ext])
console.log(path.basename(temp));//love.lrc
console.log(path.basename(temp,'.lrc'));//love
console.log(path.basename(temp,'rc'));//love.l


//path.delimiter :获取不同操作系统中默认的路径分隔符 windows中是";" linux是":"
console.log(path.delimiter);
//案例- 获取环境变量并以数组形式输出
console.log(process.env.path.split(path.delimiter));



//path.dirname(path) :获取路径的目录
console.log(path.dirname(temp));//F:\Node\FileTest



//path.extname(path):获取扩展名 包含.
console.log(path.extname(temp));//.lrc




//path.parse(path) :将一个路径字符串转换为一个对象(包含文件目录 文件名 扩展名)
var obj=path.parse(temp);
console.log(obj);
//{ root: 'F:\\',
//    dir: 'F:\\Node\\FileTest',
//    base: 'love.lrc',
//    ext: '.lrc',
//    name: 'love' }



//path.format(pathObject) :将路径对象转化为字符串
console.log(path.format(obj));//F:\Node\FileTest\love.lrc




//path.isAbsolute(path) :判断是不是绝对路径
console.log(path.isAbsolute(temp));//true



//path.join([...paths]) ：拼接路径 [...paths]是指多个参数
console.log(path.join(__dirname,'./FileTest','./1.txt'));



//path.normalize(path) :常规化一个路径
var a=path.normalize('G:\\node\\03-node第三天 2016-03-06\\03-2016-03-06\\day03\\lyrics')
console.log(a);



//path.relative(from, to):获取to相对于from的相对路径
console.log(path.relative(__dirname,'G:\\node\\03-node第三天 2016-03-06\\03-2016-03-06\\day03\\lyrics'))


//path.resolve([...paths])  :有点类似于join
console.log(path.resolve(__dirname,'./','./FileText'));



//path.sep  :操作系统默认路径的分隔符
console.log(path.sep);//\




//path 根据操作系统决定
//path.win32 :windows
console.log(path.win32);//也就是path  ==> path===path.win32
//相当于下面
//var path={
//    win32:null
//};
//path.win32=path;



//path.posix 允许在任意操作系统上使用windows的方式操作路径
console.log(path.posix);



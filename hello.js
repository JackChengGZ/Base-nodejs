///*
//* node测试  注意不能写DOM BOM
//* */
//var hello=1;
//console.log(hello);//注意 此处console是node平台提供的而不是BOM里面的
//console.error(new Error('这是一个error'));
//
//
//
///*
//* 默认process.argv的前两个参数
//* */
//var argv = process.argv;
//console.log(argv);
///*
//* 截取process.argv后面的参数
//* */
//var argvs = process.argv.slice(2);
//switch (argvs[0]){
//    case 'init':
//        console.log('你需要init');
//        break;
//    case 'install':
//        var installPackageName=argvs[0];
//        console.log('你需要'+installPackageName);
//        break;
//    case 'uninstall':
//        console.log('uninstall');
//        break;
//    default :
//        console.log('输入有误');
//        break;
//}
//console.log(argvs.toString());

















//process.stdout.write('hello'+'\n');
//
//var log=function(msg){
//    process.stdout.write(msg+'\n');
//}
//var log2=(msg)=>{//箭头函数 ES2015
//    process.stdout.write(msg+'\n');
//}
//log(1);
//log2(2);
//
//var msg='hello';
//var a=1;
//process.stdout.write(`${msg} world`);//`hello world`可以随意换行
//process.stdout.write(
//    `
//    ${msg} world ${a}
//    `
//);

////案例一：做一个动画
//const fps=10;//定义24帧
//var current=0;
//var frames=[];//每个成员就是帧
//frames[frames.length]=`(o^.^o)`;//添加一个表情
//frames[frames.length]=`(o@.@o)`;//添加一个表情
//frames[frames.length]=`(o~.~o)`;//添加一个表情
//frames[frames.length]=`(⌒:⌒)`;//添加一个表情
//var render=()=>{
//    //将当前控制台清空 输出新的内容：
//    //1.第一种这种其实是一个假象，效果不好
//    //var height=process.stdout.getWindowSize()[1];//获取控制台的高度
//    //for(var i=0;i<height;i++){
//    //    process.stdout.write('\n');
//    //}
//    //2.第二种
//    process.stdout.write('\033[2J');
//    process.stdout.write('\033[0f');
//    if(current==frames.length){
//        current=0;
//    }
//    process.stdout.write(frames[current++])
//}
//setInterval(render,1000/fps);


//案例二：做一个动画
//var fs=require('fs');//读取文件的fs模块
//var frames=[];//每个成员就是帧
//for(var i=1;i<6;i++){
//    //console.log(i);
//    //fs.readFileSync(path,option);//option是编码格式
//    frames[frames.length]=fs.readFileSync(`./FileTest/${i}.txt`,'utf-8');
//}
//const fps=10;//定义10帧
//var current=0;
//var render=()=>{
//    //将当前控制台清空 输出新的内容：
//    //1.第一种这种其实是一个假象，效果不好
//    //var height=process.stdout.getWindowSize()[1];//获取控制台的高度
//    //for(var i=0;i<height;i++){
//    //    process.stdout.write('\n');
//    //}
//    //2.第二种
//    process.stdout.write('\033[2J');
//    process.stdout.write('\033[0f');
//    if(current==frames.length){current=0;}
//    process.stdout.write(frames[current++])
//}
//setInterval(render,1000/fps);


//按两次Ctrl+c结束进程
//setInterval(function(){
//    console.log(1);
//},1000);
////用于监听是否已经按下ctrl+c
//var exiting=false;
//process.on('SIGINT', () => {
//    //console.log('按下^c');
//    if(exiting){
//        process.exit();//阻止当前的NODE进程
//    }else{
//        console.log('按下^c,再按一次退出');
//        exiting=true;
//        //setTimeout(()=>{exiting=false},1000);//这个后来添加的1秒之后exiting又被设置为false
//    }
//});


//采集用户输入的信息
//process.stdin.setEncoding('utf8');
//
//process.stdin.on('readable', () => {
//    const chunk = process.stdin.read();
//    if (chunk !== null) {
//        process.stdout.write(`data: ${chunk}`);
//    }
//});


//案例  接收用户输入的信息，判断是否正确
//var q='请输入用户名';
//var users={
//        'admin':'123',
//        'user1':'456',
//        'user2':'457'
//    };
//process.stdout.write(q+'\n');
////接收用户输入
////var res=process.stdin.readLine();//这个是不合理的,用户的操作无状态
////var isInputUserName=true;
//var username='';//如果username有值那么就会进入else环节
////当命令行中有回车出现就会触发事件
//process.stdin.on('data',(inputMsg)=>{//这里的data是一个流
//    //process.stdout.write(inputMsg);
//    //process.stdout.write(inputMsg+'\n');//在这里输出的时候，inputMsg会包含的有空格，回车
//    //process.stdout.write(typeof inputMsg +'\n');//object inputMsg是一个流(二进制数组)
//
//    inputMsg=inputMsg.toString().trim();//inputMsg必须转为字符串之后去掉空白字符
//    //要在此处知道到底inputMsg是啥，是密码还是用户名
//    if(!username){
//        //传入的是用户名
//        //获取一个键值对中的键，并且返回值是一个数组
//        if(Object.keys(users).indexOf(inputMsg)===-1){
//            //用户名不存在
//            process.stdout.write('用户名不存在'+'\n');
//            process.stdout.write(q+'\n');
//            //isInputUserName=true;//做一个标志位
//            username='';
//        }else{
//
//            //console.log('存在');
//            process.stdout.write('请输入密码'+'\n');
//            //isInputUserName=false;//做一个标志位
//            username=inputMsg;//用户名存在 并将他保存下来
//        }
//    }else{
//        //传入的是密码
//        //console.log(123)
//        //注意此次的inputMsg是密码，上一次输入的用户名就没有保存下来，没法使用，所以定义了一个全局的username保存inputMsg
//        if(inputMsg===users[username]){//本次的inputMsg是输入的密码  而username是上次保留下来的用户名
//            console.log('登录成功');
//        }else{
//            process.stdout.write('请输入密码'+'\n');
//        }
//    }
//});

//测试异步操作
//阻塞形式
//console.time('main');//代码计时器
//console.log('开始执行了');
//for(var i=0;i<1000000000;i++){//不断的循环,阻塞了代码的执行
//
//}
//console.log('完成执行了');
//console.timeEnd('main');

//解决上面的方式----非阻塞
//console.time('main');//代码计时器
//console.log('开始执行了');
//setTimeout(()=>{
//    for(var i=0;i<1000000000;i++){//不断的循环,阻塞了代码的执行
//    }
//    console.log('循环完了');
//},0);
//console.log('完成执行了');
//console.timeEnd('main');

//解决上面的方式-回调
//console.time('main');
////var data=get('http://www.baidu.com');//去请求网络(阻塞情况) 比如2000ms
////console.log(data);//类似于这种,后面用到了data,就不好用setTimeout
//get('http://www.baidu.com',(data)=>{
//    console.log(data);
//})
//console.log('完成执行了');
//console.timeEnd('main');


//1.如果函数需要回调函数,一定是在参数的最后出现,callback错误优先的回调函数
//function getFileAsync(path,callback){
//    if('错误'){
//        callback(new Error('xxx错误'))
//    }else{
//        callback(null,data);
//    }
//}
//案例--回调函数判断一个奇偶数
//function isEvenOdd(num,callback){
//    if(typeof num=='number'){
//        if(num%2){
//            callback(null,'当前传入的是奇数');
//        }else{
//            callback(null,'当前传入的是偶数');
//        }
//    }else{
//        //throw new Error('传入的不是函数');
//        callback(new Error('传入的不是函数'))
//    }
//}
////默认将错误函数error信息作为回调的第一个参数
//isEvenOdd(10,(error,data)=>{
//    if(error){
//        throw error;
//    }
//    console.log(data);
//})
//isEvenOdd(11,(error,data)=>{
//    if(error){
//        throw error;
//    }
//    console.log(data);
//})
//isEvenOdd('hjhk',(error,data)=>{
//    if(error){
//        throw error;
//    }
//    console.log(data);
//})



//案例----事件驱动和非阻塞机制
var fs=require('fs');
////这里的读文件的操作会耗费时间  node会把这个任务传递给操作系统,
//// 操作系统会先把他存储起来,会有单独的线程来处理
///*本来在这里的读文件就是一个I/O操作，读和输出
//    var content=fs.readFile('./FileTest/1.txt');
//    但是这样会会有阻塞，就是非得系统把文件读取完之后才会执行后面的代码
//*/
////基于上面的情况，node就采用了下面回调函数这个形式
fs.readFile('./FileTest/1.txt','utf-8',(error,data)=>{//默认错误优先
    //这个是当读取文件的时候发生错误，将这个错误抛出
    //记住这里不能自己去写try catch;因为他的这个错误是操作系统抛出的错误，
    // 然后传递给回调函数，再给抛出来
    //if(error) throw error;
    console.log(data);
});


////案例----node如何充分利用单线程
////提一下TypeScript  这个是js和C#结合的一种，具有强制类型
////      还有CoffeScript,其实他也只是一种语法糖而已
//const fs=require('fs');
//console.time('timer');
////fs.exists(path,callback)//通过检查文件系统来测试给定的路径是否存在。
//// 然后使用 true 或 false 为参数调用 callback。但是上面的方式已经不用了，换下面的：
////判断这个文件是否存在
//fs.stat('./FileTest/1.txt',(error,stats)=>{//错误优先的回调函数，注意箭头函数的this指向了调用者
//    //console.log(stats);
//    if(error){
//        console.log('文件不存在');
//        console.error(error);
//        var a=12;//给新创建的文件添加的内容
//        //创建文件成功
//        fs.writeFile('./FileTest/1.txt',a,(error)=>{
//            if(error){ //创建文件失败
//                console.error(error);
//            }else{
//                console.log('文件创建成功');
//            }
//
//        });
//    }else{
//        //如果这个文件存在就把删除
//        fs.unlink('./FileTest/1.txt',(error)=>{
//            if(error){
//                console.error(error);//删除文件失败
//            }else{
//                //删完之后再创建
//                fs.writeFile('./FileTest/1.txt',new Date(),(error)=>{
//                    if(error){ //创建文件失败
//                        console.error(error);
//                    }else{
//                        console.log('删除之后创建成功');
//                    }
//                });
//            }
//        });
//    }
//});
//console.timeEnd('timer');//最终的时间只有0.几毫秒  采用这个回调函数的异步大大降低了时间

//'use strict'//严格模式 不然无法支持let 等ES6
////V8对ES6支持分为：根本不支持  直接支持  严格模式支持
////Node开发服务器的阻塞情况
//const http=require('http');
//let count=0;
//const server=http.createServer(function(request,response){
//// 此回调会在有任何用户请求时候触发
//    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//    response.write(`你是${count++}个访问用户`);//02468...
//    if(count == 10){
//    //当地10个请求的时候，他会一直在请求，一直在转，
//    // 但是当第11个去请求的时候还是会在哪里转，因为node只有一个线程,而这个线程被第10个占用了
//        while(true){
//
//        }
//    }
//    response.end()
//});
//server.listen(2080,(error)=>{
//    if(error) throw error;
//    console.log('成功启动web服务，端口：2080')
//})









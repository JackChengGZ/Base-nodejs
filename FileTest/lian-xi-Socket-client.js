/**
 * Created by Administrator on 2018/2/17.
 */
//客户端
const net=require('net');
const readline=require('readline');//引入流
const rl=readline.createInterface(process.stdin,process.stdout);//创建输入输出流
//调用rl的question方法
rl.question('你好呀，你叫啥？',(name)=>{
    name=name.trim();
    if(!name){
        throw new Error('没名字！！！');
    }
    //与服务端连接  然后把数据传给socket  socket在传给客户端
    //{port:2080,host:192.111.22.01}  如果说服务端在本地 那么就不用写host
    //serverSocket  服务端返回过来的socket
    var serverSocket=net.connect({port:2080},()=>{
        console.log('与服务端建立正常连接！！！');
        //监听服务端发送过来的数据  把数据解析出来打印在控制台
        serverSocket.on('data',(chunk)=>{
            //console.log(chunk.toString());
            try{
                var signal=JSON.parse(chunk.toString().trim());
                var procotol=signal.procotol;
                //console.log(signal);
                switch(procotol){
                    case 'boardcast':
                        console.log('\nboardcast');
                        console.log(signal.from + '>');
                        console.log(signal.message);
                        rl.prompt();
                        break;
                    default :
                        serverSocket.write('约定的方式不对！！');
                        break;
                }
            }catch (error){
                serverSocket.write(error);
            }
        });
        //控制台输出
        rl.setPrompt(name+'> ');
        //等待客户端用户输入
        rl.prompt();

        rl.on('line',(line)=>{
            //console.log(line);//将刚才用户输入的内容打印出来
            var send={
                procotol:'boardcast',//约定的一种格式
                from:name,
                message:line.toString().trim()
            }
            serverSocket.write(JSON.stringify(send));
            rl.prompt();
        }).on('close',()=>{

        });
    });


});

/**
 * Created by Administrator on 2018/2/17.
 */
const net=require('net');
//用于存储所有的连接  每一次不同的客户端与服务器端连接都会创建一个新的socket
var clients=[];
//创键服务端
var server=net.createServer((clientSocket)=>{
    //那个客户端与我连接  clientSocket就是指谁  它是一个对象
    //console.log(socket);//一旦客户端有socket传递过来就会打印出来
    clients.push(clientSocket);
    console.log(`欢迎${clientSocket.remoteAddress}来到2080聊天室`);


    function boardcast(signal){
        //console.log(signal);
        //肯定有用户名和消息  就是与客户端约定一种交流的格式 方便数据的读取
        var username=signal.from;
        var message=signal.message;
        //需要发送给客户端的东西  其实在这里约定的一种协议就相当于http协议
        var send={
            procotol:signal.procotol,//约定的一种格式
            from:username,
            message:message
        };
        //广播消息
        clients.forEach(client=>{
            client.write(JSON.stringify(send));
        });
    }
    //有任何客户端发消息都会触发
    clientSocket.on('data',(chunk)=>{
        //在这里这个chunk就类似于http中的报文
        try{
            var signal=JSON.parse(chunk.toString().trim());
            var procotol=signal.procotol;
            switch(procotol){
                case 'boardcast':
                     boardcast(signal);
                    break;
                default :
                    clientSocket.write('约定的方式不对！！');
                    break;
            }
        }catch (error){
            clientSocket.write(error);
        }
        //console.log(chunk.toString('utf8'));
    }).on('error',(error)=>{//做一个错误处理 不然客户端下线了就把他从数组中移除 服务端会报错
        console.log(`${clientSocket.remoteAddress}下线`);
        clients=clients.splice(clients.indexOf(clientSocket),1);
    });
});
var port=2080;// 如果2080换成0 系统会随机给分配一个端口号
//上面创建一个socket服务端之后会返回一个server对象 然后去监听特定的端口
//一个端口只能同时被一个进程占用
server.listen(port,(error)=>{
    //如果监听失败(端口被占用)
    if(error){
        console.log(`${port}端口被占用`);
        return false;
    }
    //成功监听2080端口之后执行
    console.log(`服务端正常开启${port}端口`);
});
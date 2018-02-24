/**
 * Created by Administrator on 2018/2/15.
 */
//建立一个Socket服务端
//其实这个socket是一个抽象性的概念  就是客户端与服务器端进行连接的方式
// socket 通过监听服务器端端口 与客户端保持联系
const net=require('net');
//创建一个socket服务端  会返回一个server
var server=net.createServer(socketConnect);
//当有客户端与我连接的时候 我就会触发这个连接事件  (客户端去请求的时候也会给自己随机分配一个端口)
//比如说通过浏览器访问2080端口 或者telnet 127.0.0.1 2080访问
//每次 不同的客户端去请求服务端的时候 所生成的socket对象也是不一样的
function socketConnect(socket){
    //var client=socket.address();//与服务器端连接的客户端
    ////如果说我把服务端关掉 客户端也退出了
    //console.log(`某客户端${client.address}在访问我当前监听的端口`);
    ////远端的IP和端口  部署线上
    ////console.log(`${socket.remoteAddress}:${socket.remotePort}`);
    ////客户端连接上我之后我给客户端发一条消息
    //socket.write('hello 你来了？---服务端发过来的');



    //监听socket是否有数据过来 这里就不是文件流了  而是网络流
    socket.on('data',(chunk)=>{
        console.log(chunk.toString('utf8'));
        socket.write('server> 你说啥?');
    });

}
var port=2080;// 如果2080换成0 系统会随机给分配一个端口号
//上面创建一个socket服务端之后会返回一个server对象 然后去监听特定的端口
server.listen(port,(error)=>{
    //如果监听失败(端口被占用)
    if(error){
        console.log(`${port}端口被占用`);
        return false;
    }
    //成功监听2080端口之后执行
    console.log(`服务端正常开启${port}端口`);
})
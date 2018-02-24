/**
 * Created by Administrator on 2018/2/15.
 */
//建立socket客户端
const net=require('net');
const client=net.connect({port:2080},()=>{
    //连接监听
    console.log('连接上服务器端');
    //client.write('成功连接上服务器端--客户端发过来的!!\r\n');

    //连接成功之后 我在客户端控制台前面加上client>
    process.stdout.write('\nclient>');
    //控制台输入回车触发一次  process.stdin.on
    process.stdin.on('data',(chunk)=>{
        //chunk就是我要发送给服务端的数据
        //console.log(chunk.toString().trim());

        client.write(chunk.toString().trim());

        //process.stdout.write('\nclient>');
    });

    //监听服务端返回过来的数据
    client.on('data',(data)=>{
        console.log('\n'+data.toString());
        //client.end();
    });

});




////监听是否断开了连接
//client.on('end',()=>{
//    console.log('与服务器端断开连接');
//});
/**
 * Created by Administrator on 2018/2/20.
 */
const net = require('net');
const dns = require('dns');

// 用户输入地址的情况
const host = 'www.cnblogs.com';

dns.lookup(host, (err, address, family) => {
    if (err) throw err;

    console.log("address "+address);// 42.121.252.58

    console.log("family "+family);//4

    const socket = net.connect({ port: 80, host: address }, (error) => {
        socket.setEncoding('utf8');

        // 请求报文
        var request = `GET / HTTP/1.1
Host: ${host}
`;

        socket.on('data', (response) => {
            console.log("response :"+response);
        });



    });
});

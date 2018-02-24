/**
 * Created by Administrator on 2018/2/20.
 */
var dns = require('dns');

dns.lookup('www.baidu.com', (error, address) => {
    console.log(address);//183.232.231.173
});
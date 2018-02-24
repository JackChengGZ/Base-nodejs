/**
 * Created by Administrator on 2018/2/20.
 */
// 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

// http 协议
// user:pass 身份认证信息
// host.com:8080 主机 （host）
// host.com 主机名
// 8080 端口
// /p/a/t/h pathname
// ?query=string  查询字符串 QueryString
// #hash 锚点（服务端拿不到锚点值）



const url = require('url');

var target = 'http://host.com:8080/p/a/t/h?query=string#hash';

console.log(url.parse(target, false, true));

// 只能用于没有加HTTP/HTTPS情况
var target2 = '//host.com:8080/p/a/t/h?query=string#hash';
console.log(url.parse(target2, false, false));
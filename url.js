/**
 * Created by Administrator on 2018/2/20.
 */
// 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

// http Э��
// user:pass �����֤��Ϣ
// host.com:8080 ���� ��host��
// host.com ������
// 8080 �˿�
// /p/a/t/h pathname
// ?query=string  ��ѯ�ַ��� QueryString
// #hash ê�㣨������ò���ê��ֵ��



const url = require('url');

var target = 'http://host.com:8080/p/a/t/h?query=string#hash';

console.log(url.parse(target, false, true));

// ֻ������û�м�HTTP/HTTPS���
var target2 = '//host.com:8080/p/a/t/h?query=string#hash';
console.log(url.parse(target2, false, false));
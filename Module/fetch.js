/**
 * Created by Administrator on 2018/2/20.
 */
const http = require('http');
const https = require('https');//�������ڴ����վ��https��

module.exports = (url, callback) => {
    //������http ��https
    https.get(url, (response) => {
        var rawContent = '';
        response.on('data', (chunk) => {
            rawContent += chunk.toString();
        });
        response.on('end', () => {
            callback(null, rawContent);
        });
        response.on('error', (err) => {
            callback(err);
        })
    });

};